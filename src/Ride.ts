import mongoose from "mongoose";


const geoPointSchema = {
  _id: false, // Prevent auto _id
  type: { type: String, enum: ['Point'], required: true },
  coordinates: {
    type: [Number],
    required: true,
    validate: {
      validator: (v: number[]) => v.length === 2 && v.every(n => typeof n === 'number'),
      message: 'Coordinates must be an array of two numbers [lng, lat]'
    }
  }
};

const RideSchema = new mongoose.Schema({
  sourceLocation: geoPointSchema,
  destinationLocation: geoPointSchema,
  waypoints: [geoPointSchema], // ✅ No _id here
  city: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userType: { type: String },
  seatsAvailable: { type: Number },
  price: { type: Number },
  date: { type: Date },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

// Geo indexes
RideSchema.index({ sourceLocation: '2dsphere' });
RideSchema.index({ destinationLocation: '2dsphere' });
RideSchema.index({ waypoints: '2dsphere' });

export default mongoose.model('Ride', RideSchema);


export const Ride = mongoose.model('GT.Rides', RideSchema);
