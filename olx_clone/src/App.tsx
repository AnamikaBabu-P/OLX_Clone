import {Routes, Route } from "react-router-dom"
import Main from "./components/Main"
import Details from "./components/Details"
import SellProduct from "./components/SellProduct"
import { useState } from 'react'

interface Product {
  id:number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

const App = () => {

  const [products, setProducts] = useState<Product[]>([])

  const addProduct = (newProduct: Product) => {
      setProducts((prevProducts) => [...prevProducts, newProduct])
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<Main products={products}/>}/>
      <Route path='/details' element={<Details/>}/>
      <Route path='/sell' element={<SellProduct addProduct={addProduct}/>}/>
    </Routes>
    </>
  )
}

export default App
