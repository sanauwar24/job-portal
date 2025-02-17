import Job from "../models/job.js"
import JobApplication from "../models/jobApplication.js"
import User from "../models/Users.js"
import { v2 as cloudinary } from "cloudinary"

export const getUserData = async(req,res) =>{

    const userId = req.auth.userId

    try {
        const user = await User.findById(userId)
        if(!user){
            return res.json({success:false , message :'user not found'})
        }
        res.json({success: true , user})


    } catch (error) {
        res.json({
            success: false , message:error.message
        })
    }

}

export const applyForJob = async(req,res)=>{

    const {jobId} = req.body
    const userId = req.auth.userId

    try {
        const isAlreadyApplied = await JobApplication.find({jobId , userId})
        if(isAlreadyApplied.length>0){
            return res.json({success:false , message:'already applied'})

        }

        const jobsData = await Job.findById(jobId)
        if(!jobsData){
            return res.json({success:false , message:'job not found'})
        }

        await JobApplication.create({
            companyId:jobsData.companyId,
            userId,
            jobId,
            date:date.now()
        })

        res.json({success:true , message:'applied succesfully'})


    } catch (error) {
        res.json({success:false , message:error.message})
    }

}


export const getUserJobApplication= async(req,res)=>{

    try {
        const userId = req.auth.userId
        const application = await JobApplication.find({userId})
        .populate('companyId', 'name email image')
        .populate('jobId','tittle description location category level salary')
        .exec()

        if(!application){
            return res.json({success:false , message:'no job application found'})
        }
        return res.json({success:true , application})


    } catch (error) {

        res.json({success:false, message:error.message })
        
    }

}


export const updateUserResume = async(req,res)=>{

    try {
        const userId = req.auth.userId
        const resumeFile = req.file
        const userData = await User.findById(userId)
        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
             userData.resume = resumeUpload.secure_url           
        }

        await userData.save()
        return res.json({success:true , message:'resume updated'})


    } catch (error) {
        res.json({success:false , message:error.message})
    }

}
