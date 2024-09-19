import { useState, useEffect } from 'react'
import olx_logo from '../assets/olx.png'
import lens from '../assets/lens_icon.png'
import arrow from '../assets/arrow_down.png'
import search from '../assets/white_lens.png'
import Login from './Login'
import { auth } from '../firebase/setup'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

type searchProp = {
    setSearch: any
}

const Navbar = (props: searchProp) => {

    const navigate = useNavigate()
    const [loginPop, setLoginPop] = useState(false)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser)
        return () => unsubscribe()
    }, [])

    const handleLogout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error("Error signing out: ", error)
        }
    }

    return (
        <>
            <div className='flex p-4 bg-slate-100 shadow-md h-20'>
                <img src={olx_logo} className='w-11 h-6 mt-2' />
                <div className='flex border-2 border-spacing-1 w-70 p-2 border-black mil-5 bg-white ml-5 rounded-md'>
                    <img src={lens} className='w-6 h-5 mt-1' />
                    <input placeholder='Location' className='ml-3 outline-none' />
                    <img src={arrow} className='w-6 h-6 mt-1 me-4' />
                </div>
                <div className='flex h-12 ml-4 border-2 border-black bg-white ' style={{ width: '800px' }}>
                    <input onChange={(e) => props?.setSearch(e.target.value)} placeholder='Find Cars, Mobile phones and more' className=' w-96' style={{ width: '800px' }} />
                    <img src={search} className='ml-auto' />
                </div>
                <div className='flex h-12 p-3 ml-auto w-50 cursor-pointer'>
                    <h1 className='font-semibold'>ENGLISH</h1>
                    <img src={arrow} className='w-8 h-7' />
                </div>
                {!user ? (
                    <div onClick={() => setLoginPop(!loginPop)} className='flex h-12 p-3 ml-auto cursor-pointer underline hover:no-underline'>
                        <h1 className='font-bold text-lg'>Login</h1>
                    </div>
                ) : (
                    <div onClick={handleLogout} className='flex h-12 p-3 ml-auto cursor-pointer underline hover:no-underline'>
                        <h1 className='font-bold text-lg'>Logout</h1>
                    </div>
                )}
                <div  onClick={() => navigate('/sell')} className='flex h-12 p-3 ml-auto cursor-pointer rounded-full text-center border-4 border-blue-500'>
                    <h1 className='font-bold text-lg text-center  ml-3'>+ SELL</h1>
                </div>
            </div>
            {loginPop && <Login setLoginPop={setLoginPop} />}
        </>
    )
}

export default Navbar