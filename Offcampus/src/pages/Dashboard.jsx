import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {

  const navigate = useNavigate()
  const { companyData , setCompanyData, setCompanyToken } = useContext(AppContext)

  const logout = ()=>{
    setCompanyToken(null)
    localStorage.removeItem('companyToken')
    setCompanyData(null)
    navigate('/')
  }

  useEffect(()=>{

    if (companyData) {
      navigate('/dashboard/manageJobs')
    }

  },[companyData])

  return (
    <div className='min-h-screen'>
      {/*  */}

      <div className='shadow py-5'>
        <div className='px-5 flex justify-between items-center'>
          { /* <img  className = 'max-sm:w-32 cursor-pointer h-12 w-100 '  onClick={() => navigate('/')}  src='' alt="" />*/}
          <h1 className='font-bold m-0'>Offcampus</h1>
          {companyData && (
             <div className='flex items-center gap-3'>
             <p className='max-sm:hidden'> Welcome , {companyData.name}</p>
             <div className='relative group '>
               <img className='w-8 border rounded-full' src={companyData.image} alt="" />
               <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                 <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                   <li onClick={logout} className='py-1 px-2 '>Logout</li>
                 </ul>
               </div>
             </div>
           </div>
          )}
         
        </div>
      </div>

      <div className='flex items-start'>

        <div className='inline-block min-h-screen border-r-2'>
          <ul className='flex flex-col items-start pt-5 text-gray-950'>
            <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-700'}`} to={'/dashboard/addJobs'}>
              <img className='min-w-4' src={assets.add_icon} alt="" />
              <p className='max-sm:hidden'>Add Jobs</p>
            </NavLink>

            <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-700'}`} to={'/dashboard/manageJobs'}>
              <img className='min-w-4' src={assets.home_icon} alt="" />
              <p>Manage Jobs</p>
            </NavLink>

            <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-700'}`} to={'/dashboard/viewApplications'}>
              <img className='min-w-4' src={assets.person_tick_icon} alt="" />
              <p>View Applications</p>
            </NavLink>

          </ul>
        </div>

        <div className='flex h-full p-2 sm:p-5'>
          <Outlet />
        </div>


      </div>

    </div>
  )
}

export default Dashboard