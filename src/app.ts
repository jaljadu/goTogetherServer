import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './user.routes';
import rideRoutes from './ride.routes';
import rideRequestRoutes from './riderequest.routs';
import  priceRoutes from './price.routes';
import notificationRoutes from './notification.router';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/riderequest', rideRequestRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/priceConfig', priceRoutes);
export default app;
