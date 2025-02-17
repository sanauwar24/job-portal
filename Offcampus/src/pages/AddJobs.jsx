import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill';

import { JobLocations, JobCategories } from '../assets/assets'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJobs = () => {

  const [title, setTitle] = ('')
  const [location, setLocation] = useState('Hyderabad')
  const [category, setCategory] = useState('programing')
  const [level, setLevel] = useState('beginner')
  const [salery, setSalery] = useState(0)

  const editRef = useRef(null)
  const quillRef = useRef(null)
  const {backendUrl , companyToken} = useContext(AppContext)

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    try {
      const description = quillRef.current.root.innerHTML
      const {data} = await axios.post(backendUrl+ '/api/company/postJob', 
        {title,description,location,salery,category,level},
        {headers:{token:companyToken}}
      )

      if (data.success) {
        toast.success(data.message)
        setTitle('')
          setSalery(0)
          quillRef.current.root.innerHTML = ''
        
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (!quillRef.current && editRef.current) {
      quillRef.current = new Quill(editRef.current, { theme: 'snow', })
    }
  }, [])


  return (
    <form onSubmit={onSubmitHandler} className='container p-4 flex flex-col w-full items-start gap-3 '>

      <div className='w-full'>
        <p className='mb-2'>Job Title </p>
        <input onChange={e => setTitle(e.target.value)} value={title} type="text" placeholder='  enter here ' required
          className='w-full max-w-lg px-3 py-2 border-gray-400 rounded ' />
      </div>
      <div className='w-full max-w-lg' >
        <p className='m-4'>job Description </p>
        <div ref={editRef}>

        </div>

      </div>

      <div className='flex flex-col sm:flex-row gap-2 sm:gap-7 w-full'>
        <div className=''>
          <p className='mb-3'>job category </p>
          <select className='w-full px-3 py-3 border-2 border-gray-400r rounded' onChange={e => setCategory(e.target.value)}>
            {JobCategories.map((category, index) => (
              <option key={index} value={category}> {category}</option>
            ))}
          </select>

        </div>

        <div>
          <p className='mb-3'>job location </p>
          <select className='w-full px-3 py-3 border-2 border-gray-400r rounded' onChange={e => setLocation(e.target.value)}>
            {JobLocations.map((location, index) => (
              <option key={index} value={location}> {location}</option>
            ))}
          </select>

        </div>

        <div>
          <p className='mb-3'> Level </p>
          <select className='w-full px-3 py-3 border-2 border-gray-400r rounded' onChange={e => setLevel(e.target.value)}>
            <option value="Beginner level"> Beginner level </option>
            <option value="intermediate level"> Intermediate level </option>
            <option value="Senior level "> Senior level </option>
          </select>

        </div>



      </div>
      <div>
        <p className='mb-2'>Salery</p>
        <input className='w-full px-4 py-3 border-2 border-gray-300 rounded sm:w-[120px]' min={0} onChange={e => setSalery(e.target.value)} type="Number" placeholder='eg : 5000' />
      </div>
      <button className='bg-zinc-800 text-white p-1.5 mt-5 py-3 w-24 rounded-md'>ADD</button>


    </form>
  )
}

export default AddJobs