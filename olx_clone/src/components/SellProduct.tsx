import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Firestore } from "firebase/firestore";
import { db, storage } from '../firebase/setup'; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 



const SellProduct = ({ addProduct }: { addProduct: any }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null); 

    const navigate = useNavigate();

    
    const handleSubmit = async (e: React.FormEvent) => {
       
        e.preventDefault();

        if (!imageFile) {
            alert("Please upload an image.");
            return;
        }

        
        try {
        // const storageRef = ref(storage,`products/${imageFile.name}`);

            console.log('starting')
            // const snapshot = await uploadBytes(storageRef, imageFile).then((snapshot) => {
            //     console.log('Uploaded a blob or file!')}).catch(err=>console.log(err))
            // console.log(snapshot,'snapshot')
            // console.log(storageRef,'storageRef')
            // const imageURL = await getDownloadURL(snapshot.ref); 
            const data=new FormData()
            data.append("file", imageFile);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "piyushproj");
        
            fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
                method: "post",
                body: data,
              }).then((res) => res.json()).then(async(data)=>{
                const url=data.url.toString();
                console.log(url,"url");
                const doc = await addDoc(collection(db, "products"), {
                    title,
                    price,
                    url,
                    description,
                    category
                
                  });
                  console.log(doc, "doc");
          
        })
            // const newProduct = {
        //         title,
        //         description,
        //         category,
        //         price: parseFloat(price), 
        //         // image: imageURL 
        //     };

        //    console.log('dlskjdkfl')
        //     await addDoc(collection(db, 'products'), newProduct);

        //     addProduct(newProduct);

            navigate('/');
        } catch (error:any) {
            console.log('jkadjfklasjdkladjklfafjfkldaj')
            console.log('Error adding product: ', error.message);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <div className='flex justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col w-96'>
                <h1 className='text-2xl font-bold mb-4'>Sell Your Product</h1>
                <input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder='Product Title' 
                    className='p-2 border mb-4'
                    required 
                />
                <input 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder='Description' 
                    className='p-2 border mb-4'
                    required 
                />
                <input 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    placeholder='Category' 
                    className='p-2 border mb-4'
                    required 
                />
                <input 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    placeholder='Price' 
                    type="number"
                    className='p-2 border mb-4'
                    required 
                />
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className='p-2 border mb-4'
                    accept="image/*" 
                    required 
                />
                <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SellProduct;
