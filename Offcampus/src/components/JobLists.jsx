import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets'
import JobCard from './JobCard'

const JobLists = () => {

  const { isFound, findFilter, setFindFilter, jobs } = useContext(AppContext)

  const [view, setView] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedLocation, setSelectedLocation] = useState([])

  const [filtereJobs , setFilteredJobs] = useState(jobs)

  const handleCategoryChange = (category)=>{
    setSelectedCategory(
      prev=> prev.includes(category) ? prev.filter(c => c !== category) : [...prev , category]
    )
  }

  const handleLocationChange = (location)=>{
    setSelectedLocation(
      prev=> prev.includes(location) ? prev.filter(c => c !== location) : [...prev , location]
    )
  }
  useEffect(()=>{
    const matchesCategory = job => selectedCategory.length === 0 || selectedCategory.includes(job.category)
    const matchesLocation = job => selectedLocation.length === 0 || selectedLocation.includes(job.location)

    const matchesTitle = job => findFilter.title === "" || job.title.toLowerCase().includes(findFilter.title.toLowerCase())
    const matchesSearchLocation = job => findFilter.location === "" || job.location.toLowerCase().includes(findFilter.location.toLowerCase())

    const newFilteredjobs = jobs.slice().reverse().filter(
      job=> matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
    )
    setFilteredJobs(newFilteredjobs)
    setCurrentPage(1)

  },[ jobs, findFilter, selectedCategory, selectedLocation])



  return (
    <div className='container 2xl:px-20 flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
      {/* side bar */}
      <div className='w-full lg:w-1/4 bg-white px-4 '>
        {/* side bar */}
        {isFound && (findFilter.title !== "" || findFilter.location !== "") && (
          <>
            <h2 className='font-medium border-black mb-2'>CURRENT SEARCHED </h2>
            <div className='mb-4 text-gray-600'>
              {findFilter && (
                <span className='inline-flex gap-2.5  items-center bg-blue-50 border-blue-200 px-2 py-1 rounded  mr-3'>
                  {findFilter.title}
                  <img onClick={e => setFindFilter(prev => ({ ...prev, title: "" }))} src={assets.cross_icon} alt="" className='cursor-pointer' />
                </span>
              )}
              {findFilter && (
                <span className='inline-flex gap-2.5  items-center bg-red-50 border-red-200 px-4 py-1 rounded '>
                  {findFilter.location}
                  <img onClick={e => setFindFilter(prev => ({ ...prev, location: "" }))} src={assets.cross_icon} alt="" className='cursor-pointer' />
                </span>
              )}
            </div>
          </>
        )
        }

        <button onClick={e => setView(prev => !prev)} className='px-6 py-1 rounded border border-gray-400 lg:hidden'>
          {view ? 'close' : 'filters'}
        </button>

        <div className={view ? "" : 'max-lg:hidden'}>
          <h4 className='font-medium text-lg py-4'>SEARCH BY CATEGORY</h4>
          <ul className='space-y-4 text-gray-600'>
            {
              JobCategories.map((category, index) => (
                <li className='flex gap-3 items-center' key={index}>
                  <input className='scale-125' type="checkbox"
                  onChange={()=> handleCategoryChange(category)}
                  checked= {selectedCategory.includes(category)}
                  />
                  {category}
                </li>
              ))
            }
          </ul>
        </div>

        <div className={view ? "" : 'max-lg:hidden'} >
          <h4 className='font-medium text-lg py-4'>SEARCH BY LOCATION</h4>
          <ul className='space-y-4 text-gray-600'>
            {
              JobLocations.map((location, index) => (
                <li className='flex gap-3 items-center' key={index}>
                  <input className='scale-125' type="checkbox"
                   onChange ={()=> handleLocationChange(location)}
                   checked = {selectedLocation.includes(location)}
                  
                  />
                  {location}
                </li>
              ))
            }
          </ul>
        </div>

      </div>

      <section className='w-full lg:w-3/4 text-gray-700 max-lg:px-4 '>
        <h3 className=' font-medium text-3xl py-2' id='joblist'>LATEST JOBS</h3>
        <p className='mb-7'> get your dream job from top best tech </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 '>
          {filtereJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
            <JobCard key={index} job={job} />

          ))}


        </div>
        {filtereJobs.length > 0 && (
          <div className='flex items-center justify-center space-x-2 mt-10'>
            <a href="#joblist">
              <img onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)} src={assets.left_arrow_icon} alt="" />
            </a>
            {Array.from({ length: Math.ceil(filtereJobs.length / 6) }).map((_, index) => (
              <a key={index} href="#joblist">
                <button onClick={() => setCurrentPage(index + 1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-200 text-blue-600 ' : 'text-gray-500 '}`}>{index + 1}</button>
              </a>
            ))}

            <a href="#joblist">
              <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filtereJobs.length / 6)))} src={assets.right_arrow_icon} alt="" />
            </a>
          </div>
        )}

      </section>

    </div>
  )
}

export default JobLists