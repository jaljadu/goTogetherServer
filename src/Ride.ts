import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
  waypoints: [{
    address: String,
    lat: Number,
    lng: Number
  }],
  startTime: { type: Date, required: true },
  seatsAvailable: { type: Number, required: true },
  vehicleDetails: {
    make: String,
    model: String,
    color: String,
    plateNumber: String
  },
  pricePerSeat: { type: Number, required: true },
  isRecurring: { type: Boolean, default: false },
  recurrencePattern: { type: String, enum: ['Daily', 'Weekly', 'Custom'] },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Ride = mongoose.model('Ride', rideSchema);
