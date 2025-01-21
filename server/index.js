import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import departRouter from './routes/departmentRoutes.js'
const app = express()
import connectToDb from './db/db.js'
import cookieParser from 'cookie-parser'


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/department', departRouter)

connectToDb()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})