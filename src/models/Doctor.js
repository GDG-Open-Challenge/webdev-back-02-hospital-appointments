const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^\+?[1-9]\d{9,14}$/,
        'Please enter a valid phone number',
      ],
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
    },

    availability: {
      monday: { start: String, end: String },
      tuesday: { start: String, end: String },
      wednesday: { start: String, end: String },
      thursday: { start: String, end: String },
      friday: { start: String, end: String },
      saturday: { start: String, end: String },
      sunday: { start: String, end: String },
    },

    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
      },
    ],

    status: {
      type: String,
      enum: ['active', 'inactive', 'on_leave'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);