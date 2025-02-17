import React, { useContext } from 'react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const {openSignIn} = useClerk()
    const {user} = useUser()

    const navigate = useNavigate()

    const {setShowRecLogin} = useContext(AppContext)


  return (
    <div className='shadow py-4'>
        <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
         <div className='flex -m-11 items-center '> 
          <img onClick={()=>navigate('/')} className='h-20 w-100 cursor-pointer' src={assets.brand_logo} alt="" />
         <h1 className='font-bold'>Offcampus</h1>
         </div>
         
         { user 
          ?<div className='flex items-center gap-3'>
            <Link to={'/applications'}>applied jobs</Link>
            <p></p>
            <p>hi, {user.firstName +" "+ user.lastName}</p>
            <UserButton/>
          </div>
          :<div className='flex gap-4 max-sm:text-xs'>
            <button onClick={e=>setShowRecLogin(true)} >Recruiter Login</button>
            <button  onClick= {(e) => openSignIn()}className='bg-blue-700 text-white rounded-full px-5 sm:px-8 py-2'>User Login</button>
        </div>
        }
        </div>
    </div>
  )
}

export default Navbar