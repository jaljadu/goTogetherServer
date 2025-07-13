import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  driverId: String,
  origin: {
    address: String,
    lat: Number,
    lng: Number
  },
  destination: {
    address: String,
    lat: Number,
    lng: Number
  },
  startDate: { type: Date, required: false },
  startTime: { type: Date, required: false },
  seatsAvailable: { type: Number, required: false },
  pricePerSeat: { type: Number, required: false },
  isRecurring: { type: Boolean, default: false },
  recurringPattern: { type: String, default: false },
  isActive: { type: Boolean, default: false }
}, { timestamps: false });

export const Ride = mongoose.model('GT.Ride', rideSchema);
