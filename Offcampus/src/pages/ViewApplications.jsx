import React, { useContext, useEffect, useState } from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ViewApplications = () => {

  const { backendUrl, companyToken, } = useContext(AppContext)

  const [applicants, setApplicants] = useState(false)

  // fun to fetch company job Applications data

  const fetchCompanyJobApplications = async () => {

    try {
      const { data } = await axios.get(backendUrl + '/api/company/applicants',
        { headers: { token: companyToken } }
      )
      if (data.success) {
        setApplicants(data.applications.reverse())

      } else {
        toast.error(data.message)
      }


    } catch (error) {
      toast.error(error.message)
    }
  }

  //func to update application staus

  const changeApplicationStatus = async () => {

    try {
      const { data } = await axios.get(backendUrl + '/api/company/changeStatus',
        { id, status },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        fetchCompanyJobApplications()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications()
    }

  }, [])

  return applicants ? applicants.length === 0 ?

    (
      <div className='flex items-center justify-center'>
        <p className='text-xl sm:text-2xl'>No Applications are Available</p>
      </div>

    )


    : (
      <div className='container mx-auto p-4'>
        <div>
          <table className='w-full max-w-4xl bg-white border border-gray-300 max-sm:text-sm'>
            <thead>
              <tr className='border-b'>
                <th className='py-2 px-4 text-left'>#</th>
                <th className='py-2 px-4 text-left'>UserName</th>
                <th className='py-2 px-4 text-left max-sm:hidden'>Job title</th>
                <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
                <th className='py-2 px-4 text-left'>resume</th>
                <th className='py-2 px-4 text-left'>action</th>
              </tr>
            </thead>
            <tbody>
              {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
                <tr key={index} className='text-gray-700'>
                  <td className='text-center border-b px-4 py-2'>
                    {index + 1}
                  </td>
                  <td className='text-center border-b px-4 py-2 flex'>
                    <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' src={applicant.userId.image} alt="" />
                    <span>{applicant.userId.name}</span>
                  </td>
                  <td className='border-b px-4 py-2 max-sm:hidden'>{applicant.jobId.title}</td>
                  <td className='border-b px-4 py-2 max-sm:hidden'>{applicant.jobId.location}</td>
                  <td className='py-2 px-4 border-b'>
                    <a href={applicant.userId.resume} target='_blank'
                      className='bg-blue-100 text-blue-400 inline-flex items-center py-2 px-3 gap-2 rounded'

                    >Resume
                      <img src={assets.resume_download_icon} alt="" />
                    </a>
                  </td>
                  <td className='py-2 px-4 border relative'>
                    {applicant.status === 'Pending'
                      ? <div className='relativ inline-block text-left group'>
                        <button className='text-gray-500 action-button'>...</button>
                        <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow group-hover:block '>
                          <button onClick={() => changeApplicationStatus(applicant._id, 'Accepted')} className='block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100'>Accept</button>
                          <button onClick={() => changeApplicationStatus(applicant._id, 'Rejected')} className='block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100'>Reject</button>
                        </div>
                      </div>
                      : <div>{applicant.status}</div>
                    }

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : <Loading />
}

export default ViewApplications