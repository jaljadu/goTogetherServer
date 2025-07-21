import { Request, Response } from 'express';
import { RideRequest } from './RideRequest'
export const getRideRequest = async (req: Request, res: Response)=> {    
     const rideRequests = await RideRequest.findById(req.params.id);
     if(rideRequests)
          res.json(rideRequests);
     else {
          res.json([]);
     }
}
