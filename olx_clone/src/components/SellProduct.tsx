import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
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

        
        const storageRef = ref(storage, `products/${imageFile.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, imageFile);
            
            console.log('starting')
            const imageURL = await getDownloadURL(snapshot.ref); 
            const newProduct = {
                title,
                description,
                category,
                price: parseFloat(price), 
                image: imageURL 
            };

           console.log('dlskjdkfl')
            await addDoc(collection(db, 'products'), newProduct);

            addProduct(newProduct);

            navigate('/');
        } catch (error) {
            console.error('Error adding product: ', error);
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
