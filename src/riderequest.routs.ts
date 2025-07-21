import { Router } from 'express';
import { getRideRequest } from './rideRequest.controller';

const router = Router();


router.get('/:id', getRideRequest);

export default router;
