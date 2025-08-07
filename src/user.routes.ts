import { Router } from 'express';
import { createUser, getAllUsers,getUserDetails,updateUser } from './user.controller';

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/get', getUserDetails);
router.get('/updateUser', updateUser);



export default router;
