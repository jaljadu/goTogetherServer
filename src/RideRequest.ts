import mongoose from "mongoose";

const rideRequestSchema = new mongoose.Schema({
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seatsRequested: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected', 'Cancelled'], default: 'Pending' },
  pickupPoint: {
    address: String,
    lat: Number,
    lng: Number
  },
  dropoffPoint: {
    address: String,
    lat: Number,
    lng: Number
  },
  requestTime: { type: Date, default: Date.now },
  responseTime: { type: Date }
});

export const RideRequest = mongoose.model('GT.RideRequest', rideRequestSchema);
