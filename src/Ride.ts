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
  },
  placeId: {
    type: String,
    required: false,
  },
};

const RideSchema = new mongoose.Schema({
  sourceLocation: geoPointSchema,
  destinationLocation: geoPointSchema,
  waypoints: {
    _id: false, // Prevent auto _id
    type: [{
      type: { type: String, enum: ['Point'], required: true },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: function (val: number[]) {
            return val.length === 2 && val.every(coord => typeof coord === 'number');
          },
          message: 'Coordinates must be [lng, lat]',
        },
      }
    }],
    index: '2dsphere' // ✅ Add 2dsphere index
  },
  isRecurring: { type: Boolean },
  recurringPattern: { type: String },
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




export const Ride = mongoose.model('GT.Rides', RideSchema);
