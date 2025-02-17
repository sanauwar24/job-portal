import { useContext, useState } from 'react'
import './App.css'
import Home from './pages/home'
import { Route, Routes } from 'react-router-dom'
import Applications from './pages/Applications'
import ApplyJobs from './pages/ApplyJobs'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJobs from './pages/AddJobs'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { showRecLogin , companyToken} = useContext(AppContext)
    
  return (

    <div>
      {showRecLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/applyJobs/:id' element={<ApplyJobs />} />
        <Route path='/dashboard' element={<Dashboard />} >
         {
          companyToken ? <>
           <Route path='viewApplications' element={<ViewApplications />} />
          <Route path='addJobs' element={<AddJobs />} />
          <Route path='manageJobs' element={<ManageJobs />} />
          </>:null
         }

        </Route>
      </Routes>
    </div>


  )
}

export default App
