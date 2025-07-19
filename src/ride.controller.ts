import { Request, Response } from 'express';
import { Ride } from './Ride';
import { User } from './User';
const sanitizePoint = (point: any) => ({
  type: 'Point',
  coordinates: [
    Number(point.coordinates[0]),
    Number(point.coordinates[1])
  ]
});
export const createRide = async (req: Request, res: Response) => {
  try {
   
    await Ride.collection.dropIndexes();
await Ride.syncIndexes(); // Or Ride.createIndexes();
if (Array.isArray(req.body.waypoints)) {
  req.body.waypoints = req.body.waypoints.map(sanitizePoint);
}
    
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
    console.log(_req.params);
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const { userType} = user;

    const userRide = await Ride.findOne({ userId }).sort({ createdAt: -1 });
    if (!userRide) return res.status(400).json({ message: 'User ride not found' });

    const userCoords = userRide.sourceLocation;
    if (!userCoords) return res.status(400).json({ message: 'User location not found' });
    console.log(userCoords);
    const rideStart = new Date(userRide?.date ?? new Date());
    const rideStartWindowStart = new Date(rideStart.getTime() - 2 * 60 * 60 * 1000);
    const rideStartWindowEnd = new Date(rideStart.getTime() + 2 * 60 * 60 * 1000);

    // MongoDB aggregation with $geoNear
    const rides = await Ride.aggregate([
    
      {
        $geoNear: {
          near: { type: 'Point', coordinates: userCoords.coordinates },
          distanceField: 'distance',
          maxDistance: 2000,
          spherical: true,
          key: 'sourceLocation',
          query: {
            date: { $gte: rideStartWindowStart, $lte: rideStartWindowEnd },
            userId: { $ne: userId },
            userType: userRide.userType === 'rider' 
          ? { $in: ['biker', 'car_owner'] } 
          : 'rider',
          },
        },
      },
      {
        $group: {
          _id: '$_id',
          doc: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$doc' },
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
