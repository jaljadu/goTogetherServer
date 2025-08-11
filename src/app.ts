import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './user.routes';
import rideRoutes from './ride.routes';
import rideRequestRoutes from './riderequest.routs';
import  priceRoutes from './price.routes';
import notificationRoutes from './notification.router';
import  locationRoutes from './locationsearch.route';
import path from 'path';
dotenv.config();
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/riderequest', rideRequestRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/priceConfig', priceRoutes);
app.use('/api/locationsearch', locationRoutes);
export default app;
