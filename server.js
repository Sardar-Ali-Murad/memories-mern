import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
import fileUpload from "express-fileupload"


import connectDB from './db/connect.js'
import Auth from "./routes/AuthRoute.js"
import Posts from "./routes/PostRoute.js"



import cloudinary from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});



import helmet from 'helmet'

import mongoSanitize from "express-mongo-sanitize"

import xssclean from "xss-clean"
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'




import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'




if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}


app.use(express.json())
app.use(fileUpload({ useTempFiles: true }));



const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(xssclean())
app.use(mongoSanitize())
app.use(
  [
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      // connectSrc: ["'self'", 'https://checkout.stripe.com'],
      // frameSrc: ["'self'", 'https://checkout.stripe.com'],
      // childSrc: ["'self'", 'https://checkout.stripe.com'],
      // scriptSrc: ["'self'", 'https://checkout.stripe.com'],
      // styleSrc: [
      //   "'self'",
      //   'https://fonts.googleapis.com',
      //   'https://checkout.stripe.com',
      // ],
      // fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'https://*.stripe.com', 'https://res.cloudinary.com'],
      baseUri: ["'self'"],
      'script-src': ["'self'", ],
      'connect-src': ["'self'", ],
      'frame-ancestors': ["'self'",],
      // sandbox: ['allow-forms', 'allow-scripts'],
      'script-src': ["'self'", ],

    },
  })
  ]
)


app.use("/api/v1/auth",Auth)
app.use("/api/v1/post",Posts)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
