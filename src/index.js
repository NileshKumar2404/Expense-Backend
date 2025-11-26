import connectDB from './db/index.js'
import { app } from './app.js'
import dotenv from 'dotenv'

dotenv.config({
    path: './.'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    })
})

.catch((error) => {
    console.log("MongoDB connection error: ", error);
})