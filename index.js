import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import { config } from 'dotenv'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url';
import createSuperAdmin from './functions/createSuperAdmin.js'

config()

const app = express()

app.use(helmet())
app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(morgan('dev'))

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename)

app.use('/public', express.static(__dirname + '/public'))

import authRoute from './routes/auth.js'
import adminRoute from './routes/admin.js'
import userRoute from './routes/user.js'
import authorRoute from './routes/author.js'
import publisherRoute from './routes/publisher.js'
import bookRoute from './routes/book.js'
import paymentRoute from './routes/payment.js'
import checkingRoute from './routes/checking.js'

app.use('/api/auth/', authRoute)
app.use('/api/admin/', adminRoute)
app.use('/api/users/', userRoute)
app.use('/api/author/', authorRoute)
app.use('/api/publisher/', publisherRoute)
app.use('/api/book/', bookRoute)
app.use('/api/payment/', paymentRoute)
app.use('/api/checking/', checkingRoute)

app.use('*', (req, res) => {
    res.status(404).json({message: "Cannot find path 404 error"})
})

const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(port, console.log(`Database connection ready and server running on port ${port}`))
        createSuperAdmin()
    })
    .catch((err) => {
        console.log(err.message)
    })
