import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets, } from '../assets/assets.js'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import kconvert from 'k-convert';
import moment from 'moment'
import JobCard from '../components/JobCard'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/clerk-react'

const ApplyJobs = () => {
  const { id } = useParams()
  const { getToken } = useAuth()

  const navigate = useNavigate()

  const [JobData, setJobData] = useState(null)
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)
  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext)


  const fetchJob = async () => {

    try {
      const { data } = axios.get(backendUrl + `api/jobs/${id}`)
      if (data.success) {
        setJobData(data.job)
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error('login to apply')
      }

      if (!userData.resume) {
        navigate('/applications')
        return toast.error('upload resume ')
      }

      const token = await getToken()
      const { data } = await axios.post(backendUrl + '/api/users/apply',
        { jobId: JobData._id },
        { headers: { Authorization: `bearer ${token}` } }
      )
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

      fetchUserApplications()

    } catch (error) {
      toast.error(error.message)
    }
  }

  const AlreadyApplied = () => {
    const hasApplied = userApplications.some(item => item.jobId._id === JobData)
    setIsAlreadyApplied(hasApplied)
  }

  useEffect(() => {
    fetchJob()
  }, [id])

  useState(() => {
    if (userApplications.length > 0 && JobData) {
      AlreadyApplied()
    }
  }, [JobData, userApplications, id])

  return JobData ? (
    <>
      <Navbar />
      <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
        <div className='bg-white text-black rounded-lg w-full '>
          <div className='flex justify-center md:justify-between flex-wrap gap-4 px14 py-20 mb-6 bg-emerald-200 border border-emerald-400 rounded-xl'>
            <div className='flex flex-col md:flex-row items-center'>
              <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border ml-3' src={assets.company_icon} alt="" />
              <div className='text-center md:text-left text-neutral-800'>
                <h1 className='text-2xl sm:text-left font-medium'>{JobData.title}</h1>
                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-700 mt-2'>
                  <span className='flex items-center gap-1'>
                    <img src={assets.suitcase_icon} alt="" />
                    {JobData.companyId.name}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.location_icon} alt="" />
                    {JobData.location}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.person_icon} alt="" />
                    {JobData.level}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.money_icon} alt="" />
                    CTC : {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center mr-6'>
              <button onClick={applyHandler} className='bg-black text-white rounded-md p-3 px-10 '>{isAlreadyApplied ? 'Already Aplied' : 'Apply Now'}</button>
              <p className='m-2 text-gray-950'> posted {moment(JobData.data).fromNow()}</p>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row justify-between items-start'>
            <div className='w-full lg:w-2/3'>
              <h2 className='font-bold text-2xl mb-4'>job Description</h2>
              <div className='rich-text' dangerouslySetInnerHTML={{ __html: JobData.description }}></div>
              <button onClick={applyHandler} className='bg-black text-white rounded-md p-3 px-10 mt-10 '>Apply Now</button>
            </div>

            {/*  right section for more jobs */}


            <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5 '>
              <h2> more jobs from {JobData.companyId.name}</h2>
              {jobs.filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
                .filter(job => {

                  const appliedJobIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))

                  return !appliedJobIds.has(job._id)


                }).slice(0, 4)
                .map((job, index) => <JobCard key={index} job={job} />)}

            </div>
          </div>
        </div>

      </div>


      <Footer />
    </>

  ) : (
    <Loading />
  )
}

export default ApplyJobs