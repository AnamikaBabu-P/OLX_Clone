import olx_logo from '../assets/olx.png'
import lens from '../assets/lens_icon.png'
import arrow from '../assets/arrow_down.png'
import search from '../assets/white_lens.png'
import Login from './Login'
import { useState } from 'react'

type searchProp = {
    setSearch: any
}

const Navbar = (props:searchProp) => {
    const [loginPop,setLoginPop] = useState(false)


  return (
    <>
    <div className='flex p-4 bg-slate-100 shadow-md h-20'>
        <img src={olx_logo} className='w-11 h-6 mt-2'/>
        <div className='flex border-2 border-spacing-1 w-64 p-2 border-black mil-5 bg-white ml-5 rounded-md'>
            <img src={lens} className='w-6 h-5'/>
            <input placeholder='Location'  className='ml-3 outline-none'/>
            <img src={arrow} className='w-6 h-6 mt-1 me-4' />
        </div>
        <div className='flex h-12 ml-4 border-2 border-black bg-white'>
            <input onChange={(e)=>props?.setSearch(e.target.value)} placeholder='Find Cars, Mobile phones and more' className='ml-3 w-96' />
            <img src={search}/>
        </div>
        <div className='flex h-12 p-3 ml-10 cursor-pointer'>
            <h1 className='font-semibold'>ENGLISH</h1>
            <img src={arrow} className='w-8 h-7'/>
        </div>
        <div onClick={()=>setLoginPop(!loginPop)} className='flex h-12 p-3 ml-10 cursor-pointer underline hover:no-underline'>
            <h1 className='font-bold text-lg'>Login</h1>
        </div>
        <div className='flex h-12 p-3 ml-10 cursor-pointer rounded-full border border-yellow-50'>
            <h1 className='font-bold text-lg  ml-3'>+ SELL</h1>
        </div>
    </div>
    {loginPop && <Login setLoginPop = {setLoginPop}/>}
    </>
  )
}

export default Navbar
