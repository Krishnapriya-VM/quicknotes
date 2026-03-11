import express from 'express';

//Create an express app
const app = express();

//Now we can listen to a port
app.listen(5001, () => {
    console.log("Server is running on PORT: 5001");
    
})