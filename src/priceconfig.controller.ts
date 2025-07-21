import { Request, Response } from 'express';
import { PricingConfig } from './priceconfig'
export const GetPricingConfig = async (req: Request, res: Response)=> {    
     const pricingConfigs = await PricingConfig.find();
     if(pricingConfigs)
          res.json(pricingConfigs);
     else {
          res.json([]);
     }
}