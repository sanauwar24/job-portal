import React, { useContext, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'


const Hero = () => {

  const {setFindFilter , setIsFound} = useContext(AppContext)
  const titleRef = useRef()
  const locationRef = useRef()
  const onFind=()=>{
    setFindFilter({
    title : titleRef.current.value,
    location : locationRef.current.value
  })
  setIsFound(true)

  }




  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
      <div className=' bg-gradient-to-r from-indigo-800 to-indigo-950 justify-center text-white py-16 text-center mx-2 rounded-xl'>
      <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Welcome <span className='bg-gradient-to-r from-orange-700 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text p-1 '>Devolopers</span></h2>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over Milions of <span className='bg-gradient-to-r from-lime-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text p-1 '>Jobs To Apply</span></h2>
        <p className='mb-8 max-w-xl mx-auto text-sm font-light px-6'>the brighter career begins here- explore the best oppertunities take step towords your goal
        </p>
        <div className='flex items-center justify-between bg-white text-gray-700 max-w-xl pl-4 mx-4 sm:mx-auto rounded-md'>
          <div className='flerx items-center'>
            <img src='' alt='' />
            <input type="text" placeholder='search for jobs'
              className='max-sm:text-xs p-2 rounded outline-none w-full'
              ref={titleRef}
            />
          </div>
          <div className='flerx items-center'>
            <img src='' alt='' />
            <input type="text" placeholder='locations'
              className='max-sm:text-xs p-2 rounded outline-none w-full'
              ref={locationRef}
            />
          </div>
          <button  onClick = {onFind} className='bg-blue-800 px-6 py-2 rounded text-white m-2'>search</button>
        </div>
      </div>
      <div className='border-gray-300 rounded shadow m-2 p-4 flex  mt-4'>
        <div className='flex gap-7 justify-center lg:gap-16 flex-wrap'>
          <p className='font-medium bg-gradient-to-r from-orange-400 via-green-500 to-orange-800 inline-block text-transparent bg-clip-text'>trusted by</p>
          <img className='h-6' src={assets.amazon_logo} alt="" />
          <img className='h-6' src={assets.microsoft_logo} alt="" />
          <img className='h-6' src={assets.adobe_logo} alt="" />
          <img className='h-6' src={assets.samsung_logo} alt="" />
          <img className='h-6' src={assets.walmart_logo} alt="" />
          <img className='h-6' src={assets.accenture_logo} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Hero          