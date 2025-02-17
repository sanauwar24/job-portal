import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";


export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {user} = useUser()
    const {getToken} = useAuth()


    const [findFilter, setFindFilter] = useState({
        title : '',
        location: '',
})
const [isFound , setIsFound] = useState(false)

const[jobs, setJobs] = useState([])

const [showRecLogin , setShowRecLogin] = useState(false)

const [companyToken , setCompanyToken] = useState(null)
const [companyData , setCompanyData] = useState(null)

const [userData , setUserData] = useState(null)
const [userApplications , setUserApplications] = useState([])


const fetchJobs = async ()=>{

    try {
        const {data} = await axios.get(backendUrl+ '/api/jobs')

        if (data.success) {
            setJobs(data.jobs)
            console.log(data.jobs)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

const fetchCompanyData = async()=>{
    try {
        const {data} = await axios.get(backendUrl+ '/api/company/company', {headers:{token:companyToken}})

        if (data.success) {
            setCompanyData(data.company)
        }
        else{
            toast.error(data.message)
        }


    } catch (error) {
        toast.error(error.message)
    }
}

//fun to fetch userData
const fetchUserData = async ()=>{
    try {
        const token = await getToken()
        const {data} = await axios.get(backendUrl+'/api/users/user',
            {headers:{Authorization:`bearer ${token}`}}
        )
        if (data.success) {
            setUserData(data.user)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

//fetch applied applications data

const fetchUserApplications = async ()=>{

    try {
        const token = await getToken()
        const {data} = await axios.get(backendUrl+'/api/users/applications',
            {headers:{Authorization:`bearer ${token}`}}
        )

        if (data.success) {
            setUserApplications(data.applications)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }

}


useEffect(()=>{
    fetchJobs()
    const storedCompanyToken = localStorage.getItem('companyToken')

    if (storedCompanyToken) {
        setCompanyToken(storedCompanyToken)
        
    }


},[])


useEffect(()=>{
    if (companyToken) {
        fetchCompanyData()
    }
},[companyToken])

useEffect(()=>{
    if (user) {
        fetchUserData()
        fetchUserApplications()
    }
},[user])


    const value = {
        setFindFilter,findFilter,
        setIsFound , isFound,
        jobs,setJobs,
       setShowRecLogin , showRecLogin,
       companyToken, setCompanyToken,
       companyData, setCompanyData,
       backendUrl,
       userData, setUserData,
       userApplications,setUserApplications,
       fetchUserData,fetchUserApplications


    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}