const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    carModel: {
      type: String,
      required: [true, 'Car model is required'],
      minlength: [3, 'Car model must be at least 3 characters long'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a valid number greater than or equal to 0'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{11}$/, 'Phone number must be exactly 11 digits'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    images: {
      type: [String],
      required: [true, 'At least one image is required'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
