import { Router } from 'express';
import { GetPricingConfig } from './priceconfig.controller';

const router = Router();

router.get('/', GetPricingConfig);


export default router;