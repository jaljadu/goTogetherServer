// models/PricingConfig.ts
import mongoose from 'mongoose';

const PricingConfigSchema = new mongoose.Schema({
  countryCode: { type: String, required: true, unique: true },
  currency: { type: String, required: true },
  symbol: { type: String, required: true },
  prices: {
    biker: { type: Number, required: true },
    car_owner: { type: Number, required: true }
  }
});

export const PricingConfig = mongoose.model('PricingConfig', PricingConfigSchema);
