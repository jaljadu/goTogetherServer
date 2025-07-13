import { Request, Response } from 'express';
import { Ride } from './Ride';

export const createRide = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const ride = new Ride(req.body);
    const savedRide = await ride.save();
    console.log(savedRide);
    res.status(201).json(savedRide);
  } catch (err) {
    res.status(500).json({ message: 'Error creating ride', error: err });
  }
};

export const getAllRides = async (_req: Request, res: Response) => {
  try {
    const rides = await Ride.find().populate('driverId');
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rides', error: err });
  }
};

export const getRideById = async (req: Request, res: Response) => {
  try {
    const ride = await Ride.findById(req.params.id).populate('driverId');
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    res.json(ride);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching ride', error: err });
  }
};
