import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex container  items-center justify-between px-4 2xl:px-20 mx-auto'>
       <div className='flex items-center  mr-16'> 
                <img className='h-50 w-100' src={assets.brand_logo} alt="" />
               <h1 className='font-bold'>Offcampus</h1>
               </div>
        <p className='flex-1 pl-10   text-sm text-gray-500 max-sm:hidden border-1 border-gray-500'>copyright Offcampus.org | all right reserved </p>
        <div className='flex gap-2 '>
        <img className='w-15' src={assets.instagram_icon} alt="" />
        <img className='w-15' src={assets.facebook_icon} alt="" />
        <img className='w-15' src={assets.twitter_icon} alt="" />
        </div>
    </div>
  )
}

export default Footer