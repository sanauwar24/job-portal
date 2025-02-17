import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobLists from '../components/jobLists'
import DownloadApp from '../components/DownloadApp'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
       <JobLists/>
       <DownloadApp/>
       <Footer/>
    </div>
  )
}

export default Home