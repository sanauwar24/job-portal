import express from 'express'
import { applyForJob, getUserData, getUserJobApplication, updateUserResume } from '../manager/userController.js'
import upload from '../configs/multer.js'


const router = express.Router()

router.get('/user', getUserData)


router.post('/apply' , applyForJob)

router.get('/applications' , getUserJobApplication)


router.post('/updateResume', upload.single('resume'), updateUserResume)


export default router