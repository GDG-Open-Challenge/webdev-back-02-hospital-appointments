const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

router.get('/', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const appointments = await Appointment.find()
      .populate('patient', 'firstName lastName email')
      .populate('doctor', 'firstName lastName specialization')
      .populate('hospital', 'name city')
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient')
      .populate('doctor')
      .populate('hospital');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { patient, doctor, hospital, appointmentDate, duration, reason } = req.body;
    const parsedAppointmentDate = new Date(appointmentDate);

    if (Number.isNaN(parsedAppointmentDate.getTime())) {
      return res.status(400).json({ message: 'Invalid appointmentDate. Use a valid date/time.' });
    }

    if (parsedAppointmentDate <= new Date()) {
      return res.status(400).json({ message: 'appointmentDate must be in the future.' });
    }

    const appointment = new Appointment({
      patient,
      doctor,
      hospital,
      appointmentDate: parsedAppointmentDate,
      duration: duration || 30,
      reason,
    });

    const saved = await appointment.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { reason, notes, status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { reason, notes, status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
