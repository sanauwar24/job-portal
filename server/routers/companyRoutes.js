import express from 'express'
import { changeJobStatus, getCompanyData, jobAppliciant, jobVisibility, loginCompany, postedJobs, postJob, registerCompany } from '../manager/orgController.js'
import { defaultStackParser } from '@sentry/node'
import upload from '../configs/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', upload.single('image'), registerCompany)

router.post('/login', loginCompany)

router.get('/company', protectCompany,  getCompanyData)


router.post('/postJob', protectCompany ,postJob)


router.get('/applicants', protectCompany, jobAppliciant)

// router.get('/company', getCompanyData)


router.get('/jobLists',protectCompany, postedJobs)


router.post('/changeStatus', protectCompany, changeJobStatus)


router.post('/changeVisibility', protectCompany, jobVisibility)



export default router

