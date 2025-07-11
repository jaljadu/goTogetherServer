import mongoose from 'mongoose';
 
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['male', 'female'] },
  phoneNumber: { type: String, required: true },
  imageUrl: { type: String },
  userType: { type: String, enum: ['biker', 'rider','car_owner'], required: true },
}, { timestamps: true });

export const User = mongoose.model('GT.Users', userSchema);
