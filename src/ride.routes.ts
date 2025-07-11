import { Router } from 'express';
import { createRide, getAllRides, getRideById } from './ride.controller';

const router = Router();

router.post('/', createRide);
router.get('/', getAllRides);


export default router;
