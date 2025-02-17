import './configs/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './manager/webhooks.js'
import companyRoutes from './routers/companyRoutes.js'
import connectCloudinary from './configs/cloudinary.js'
import jobRouter from './routers/jobRouter.js'
import userRoutes from  './routers/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'




const app = express()

await connectDB()

await connectCloudinary()

app.use(cors())

app.use(express.json())
app.use(clerkMiddleware())

app.get('/' , (req , res)=> res.send('api is working'))

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
  
  app.post('/webhooks',clerkWebhooks)
app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRouter )
app.use('/api/users', userRoutes )

const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);

//app.use('/assets', express.static(path.join(__dirname, 'src/assets/assets.js')));

app.listen(PORT , ()=>{
    console.log(`server is running in port${PORT}`)
})