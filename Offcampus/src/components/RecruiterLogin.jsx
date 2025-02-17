import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const RecruiterLogin = () => {

    const navigate = useNavigate()

    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(false)

    const [isSubmited, setIsSubmited] = useState(false)
    const { setShowRecLogin, backendUrl } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (state == 'sign up' && !isSubmited) {
           return setIsSubmited(true)
        }

        try {
            if (state==='Login') {
                const {data} = await axios.post(backendUrl+ '/api/company/login', {email , password})
                if (data.success) {
                    console.log(data)
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecLogin(false)
                    navigate('/')
                }
                else{
                    toast.error(data.message)
                }

            }else{
                const formData = new FormData()
                formData.append('name', name)
                formData.append('password', password)
                formData.append('email', name)
                formData.append('image', name)

                const {data} = await axios.post(backendUrl+ '/api/company/register', formData)

                if(data.success){
                    console.log(data)
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecLogin(false)
                    navigate('/')
                }else{
                    toast.error(data.message)
                }
            }


        } catch (error) {
            toast.error(error.message)
        }


    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'

        }
    }, [])

    return (
        <div className='absolute top-0 right-0 left-0 z-10 bottom-0 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-700'>
                <h1 className='text-center text-2xl text-neutral-900 font-bold'>Recruiter {state}</h1>
                <p className='text-sm'> welcome ! please login to continue</p>

                {state === 'sign up' && isSubmited ?

                    <>
                        <div className='flex items-center gap-4 my-5'>
                            <label htmlFor="image">
                                <img className='w-14 rounded-full cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                <input onChange={e => setImage(e.target.files[0])} type="file" hidden id='image' />
                                <p>upload org <br /> logo </p>
                            </label>
                        </div>


                    </>
                    : <>

                        {state !== 'Login' && (
                            <div className='border flex px-4 items-center gap-2 rounded-full mt-5'>
                                <img src={assets.person_icon} alt="" />
                                <input className='outline-none text-sm' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='company name' required />
                            </div>

                        )}


                        <div className='border flex px-4 items-center gap-2 rounded-full mt-5' >
                            <img src={assets.email_icon} alt="" />
                            <input className='outline-none text-sm' onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder='email id' required />
                        </div>

                        <div className='border flex px-4 items-center gap-2 rounded-full mt-5' >
                            <img src={assets.lock_icon} alt="" />
                            <input className='outline-none text-sm' onChange={e => setPassword(e.target.value)} value={password} type="text" placeholder='password' required />
                        </div>


                    </>}

                {state === 'Login' && <p className='text-sm text-blue-600 my-4 cursor-pointer'>forgot password</p>}

                <button type='submit' className='bg-gray-900 text-white py-2 rounded-full w-full mt-2'>
                    {state === 'Login' ? 'login' : isSubmited ? 'create account' : 'next'}
                </button>
                {
                    state === 'Login' ? <p className='mt-5 text-center'> register for new account ? <span className='text to-blue-600 cursor-pointer' onClick={() => setState('sign up')}>signUp</span> </p>
                        : <p className='mt-5 text-center'>
                            already have an account <span className='text to-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span>
                        </p>
                }
                <img onClick={e => setShowRecLogin(false)} className=' absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />
            </form>
        </div>
    )
}

export default RecruiterLogin