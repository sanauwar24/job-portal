// regist a org

import { json } from "express";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utilities/generateTokens.js";
import company from "../models/company.js";
import Job from "../models/job.js";
import { JobLocations } from "../../Offcampus/src/assets/assets.js";

 export const registerCompany = async(req , res)=> {

    const {name , email , password} = req.body

    const imagefile = req.file;

    if(!name || !email || !password || !imagefile){
        return res.json({success:false , message:'missing details'})
    }

    try {
        const companyExists = await company.findOne({email})

        if(companyExists){
            return json({success:false , message:'company already registered'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password , salt)
        const imageUpload = await cloudinary.uploader.upload(imagefile.path)

        const company = await company.create({

            name,
            email,
            password,hashPassword,
            image:imageUpload.secure_url
        })

        res.json({
            success:true,
            company:{
                _id:company._id,
                name:company.name,
                email:company.email,
                image:company.image
            },
            token : generateToken(company._id)
        })



    } catch (error) {
        res.json({
            success:true,
            message:error.message
        })
    }

}


export const  loginCompany = async(req, res)=>{
const {email , password} = req.body

try {
    const company = await company.findOne({email})
    if(await bcrypt.compare(password , company.password)){
        res.json({
        success:true,
        company:{
            _id:company._id,
            name:company.name,
            email:company.email,
            image:company.image

        },
        token:generateToken(company._id)
    })
    }
    else{
        res.json({
            success:false,
            message:'invalid email or password'
        })
    }
} catch (error) {
    res.json({
        satisfies:false,
        message:error.message
    })
    
}


}


export const getCompanyData = async(req , res)=>{

   

    try {
        const company = req.company
        res.json({
            success:true , company
        })
    } catch (error) {
        res.json({success:false , message:error.message})
    }

}

export const postJob = async(req , res)=>{

    const {title , description , location , salary,level, category} = req.body
    const companyId = req.company._id
    console.log(companyId, {
        title , description , location , salary,level
    })

    try {
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date:date.now(),
            level,
            category
        })

        await newJob.save()
        res.json({success:true , newJob})


    } catch (error) {

        res.json({success:false , message:error.message})
        
    }

}

//get company jon
export const jobAppliciant = async(req , res)=>{

    try {
        
        const companyId = await req.company._id


        const applications = await JobLocations.find({companyId})
        .populate('userId', 'name image resume ')
        .populate('jobId','title location category level salary')
        .exec()

        return res.json({success:true , applications})

    } catch (error) {

        res.json({success:true , message :error.message})
    }


}


export const postedJobs = async(req, res)=>{

    try {
        const companyId = req.company._id

        const jobs = await Job.find({companyId})
        const jobsData = await Promise.all(jobs.map(async(job)=>{
            const applicants = await JobLocations.find({jobId:job.id})
            return {...job.toObject(),applicants:applicants.length}

        }))

        res.json({
            success:true,
            jobsData
        })

    } catch (error) {
        res.json({success:false , message:error.message})
    }

}


export const changeJobStatus = async(req , res)=>{

    try {
        const {id , status } = req.body

    //application status
    await JobLocations.findOneAndUpdate({_id :id}, {status})


    } catch (error) {
        res.json({success:false , message:error.message})
    }

    


}

export const jobVisibility = async(req , res)=>{

    try {
        const {id} = req.body
        const companyId = req.company._id
        const job = await Job.findById(id)

        if(companyId.toString()===job.companyId.toString()){
            job.visible=!job.visible
        }

        await job.save()

        res.json({success:true , job})


    } catch (error) {
        res.json({success:false , message:error.message})
    }

}