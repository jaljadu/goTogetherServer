import { Router } from 'express';
import { createUser, getAllUsers,getUserDetails } from './user.controller';

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/get', getUserDetails);


export default router;
