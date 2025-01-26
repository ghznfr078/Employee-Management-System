import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import departRouter from './routes/departmentRoutes.js'
import employeeRouter from './routes/employeeRoutes.js'
import salaryRouter from './routes/salaryRoutes.js'
import leaveRouter from './routes/leaveRoutes.js'
import settingRouter from './routes/settingRoutes.js'
import dashboardRouter from './routes/dashboardRoutes.js'


import connectToDb from './db/db.js'
import cookieParser from 'cookie-parser'

const app = express()



app.use(cors({
    origin: 'https://ems-two-self.vercel.app',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public/uploads'))
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/department', departRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/setting', settingRouter)
app.use('/api/dashboard', dashboardRouter)

connectToDb()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})