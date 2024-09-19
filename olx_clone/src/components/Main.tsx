import { useEffect, useState } from "react"
import Menubar from "./Menubar"
import Navbar from "./Navbar"
import Home from "./Home"
import Footer from "./Footer"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/setup"



interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

const Main = ({ products }: { products: Product[] }) => {

    // const [prod,setProd] = useState([])
    const [search,setSearch]  = useState('')
    const [menu, setMenu] = useState('')
    const[product,setProducts]=useState(null)
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'products'));
          const productsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProducts(productsList as any);
        } catch (error) {
          console.error("Error fetching products: ", error);
        }
      };
  
      fetchProducts();
    }, []);
    // const getProducts = ()=>{
    //     fetch('https://fakestoreapi.com/products')
    //         .then(res=>res.json())
    //         .then(json=>setProd(json))
    // }

    // useEffect(()=>{
    //     getProducts()
    // },[])
  return (
    <div>
      <Navbar setSearch = {setSearch} />
      <Menubar setMenu = {setMenu}/>
      <Home products = {product} search = {search} menu={menu}/>
      <Footer/>
    </div>
  )
}

export default Main
