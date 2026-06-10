

import mongoose from 'mongoose';
import express from'express';
import dotenv from 'dotenv';
import { seedDB } from './seed.js';
dotenv.config();

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
connectDB();
seedDB();