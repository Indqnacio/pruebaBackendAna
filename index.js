

import mongoose from 'mongoose';
import express from'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { seedDB } from './seed.js';
import apiRoues from './src/routes/index.js'
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

 const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

app.use(express.json())
app.use(cors());
app.use(apiRoues);

app.listen(port, () => {
  console.log("Servidor escuchando en el puerto 3000")
})

app.get('/', (req, res) => {
  res.send("Hola");
})
connectDB();
seedDB();