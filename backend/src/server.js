import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"

import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
//Create an express app

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: "http://localhost:5173"
}));

//Middleware to get the values in the req.body which parses the JSON bodies
app.use(express.json());

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

//Now we can listen to a port
connectDB().then(() =>{
    app.listen(PORT, () => {
        console.log("Server is running on PORT: ", PORT); 
    })
})
