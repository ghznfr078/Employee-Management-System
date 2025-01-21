import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
const app = express()
import connectToDb from './db/db.js'

connectToDb()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})