import { Router } from 'express';
import { getDirectionByPlace, getLocation, reverseGeocode } from './locationsearch.controller';
const router = Router();
router.get('/', getLocation);
router.get('/getDirectionByPlace', getDirectionByPlace);
router.get('/reverseGeocode', reverseGeocode);
export default router;