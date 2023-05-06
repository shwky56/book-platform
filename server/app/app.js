import express from 'express';

// app.js
import express from 'express';
import cors from 'cors';


const app = express();

// setup cors 

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


// Define your routes and middleware here

export default app;
