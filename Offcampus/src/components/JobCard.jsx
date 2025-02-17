import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'

const JobCard = ({job}) => {
  const navigate = useNavigate()




  return (
    <div className='rounded shadow border p-6'>
        <div className='flex justify-between item center'>
            <img  className = 'h-6' src={job.companyId.image} alt="" />

        </div>
        <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
        <div className='flex items-center gap-3 mt-2 text-xs'>
            <span className='bg-blue-50 border-blue-200 px-4 py-1.5 rounded'>{job.location} </span>
            <span className='bg-red-50 border-red-200 px-4 py-1.5 rounded'>{job.level}</span>
        </div>
        <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{__html:job.description.slice(0 , 150)}}></p>
        <div className='mt-4 gap-5 text-sm flex'>
            <button onClick={()=>{navigate(`/applyJobs/${job._id}`);scrollTo(0,0)}} className='bg-blue-600 text-white px-4 py-2 rounded'> Apply Now </button>
            <button  onClick={()=>{navigate(`/applyJobs/${job._id}`);scrollTo(0,0)}} className='text-gray-500 border-gray-400 px-4 py-2 '> Learn more </button>
        </div>
    </div>
  )
}

export default JobCard