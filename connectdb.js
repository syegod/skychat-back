import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

export default async function connectdb(){
    try {
        const connectionString = process.env.DBCONNECTION;
        await mongoose.connect(connectionString);
        console.log('DB connected...');
    } catch (err) {
        console.log(err.message || 'db error...');
    }
}