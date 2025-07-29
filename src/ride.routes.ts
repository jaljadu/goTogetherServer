import { Router } from 'express';
import { createRide, getAllRides, getRideById } from './ride.controller';

const router = Router();

router.post('/', createRide);
router.get('/getAllRides', getAllRides);
router.get('/getRideById', getRideById);

export default router;
