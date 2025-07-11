import mongoose from "mongoose";

const locationTrackingSchema = new mongoose.Schema({
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  location: {
    lat: Number,
    lng: Number
  }
});

export const LocationTracking = mongoose.model('LocationTracking', locationTrackingSchema);
