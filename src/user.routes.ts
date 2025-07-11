import { Router } from 'express';
import { createUser, getAllUsers } from './user.controller';

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);

export default router;
