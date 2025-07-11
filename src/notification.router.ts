import { Router } from 'express';
import { getAcsToken, getConversions } from './notification.controller';

const router = Router();

router.get('/', getAcsToken);
router.get('/', getConversions);

export default router;