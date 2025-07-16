import { Request, Response } from 'express';
import { Ride } from './Ride';
import { User } from './User';

export const createRide = async (req: Request, res: Response) => {
  try {
   
    await Ride.collection.dropIndexes();
await Ride.syncIndexes(); // Or Ride.createIndexes();
    req.body.waypoints = req.body.waypoints.map((point:any) => ({
      type: 'Point',
      coordinates: [
        parseFloat(point.coordinates[0]),
        parseFloat(point.coordinates[1])
      ]
    }));
    
    let ride = new Ride(req.body);
    console.log(JSON.stringify(ride, null, 2));
    const savedRide = await ride.save();
    console.log(savedRide);
    res.status(201).json(savedRide);
  } catch (err) {
    res.status(500).json({ message: 'Error creating ride', error: err });
  }
};

export const getAllRides = async (_req: Request, res: Response) => {
  try {
    const userId = _req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const { userType} = user;

    const userRide = await Ride.findOne({ userId }).sort({ createdAt: -1 });
    if (!userRide) return res.status(400).json({ message: 'User ride not found' });

    const userCoords = userRide.waypoints;
    if (!userCoords) return res.status(400).json({ message: 'User location not found' });

    // MongoDB aggregation with $geoNear
    const rides = await Ride.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: userCoords },
          distanceField: 'distance',
          maxDistance: 2000, // 2 km
          spherical: true,
          key: 'waypoints',
          query: {
            userId: { $ne: userId },           
            ...(userType === 'car_owner' || userType === 'biker'
              ? { userType: 'rider' }
              : userType === 'rider'
              ? { userType: 'car_owner' }
              : {}),
          },
        },
      },
    ]);

    res.json(rides);
  } catch (err) {
    console.error('Error fetching rides:', err);
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
