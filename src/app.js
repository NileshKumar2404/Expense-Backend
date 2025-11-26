import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(express.static('public'))
app.use(morgan("dev"))
app.use(cookieParser())

app.use((req, _, next) => {
    console.log(`Received ${req.method} request with body:`, req.body);
    console.log(`Received ${req.method} request with params:`, req.params);
    next();
});


import userRouter from './routes/user.routes.js'
import expenseRouter from './routes/expense.routes.js'

app.use('/api/v1/user', userRouter)
app.use('/api/v1/expense', expenseRouter)

export { app }