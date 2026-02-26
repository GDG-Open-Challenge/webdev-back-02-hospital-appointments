const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');

router.get('/', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const specialization = req.query.specialization;

    let query = {};
    if (specialization) {
      query = { specialization };
    }

    const doctors = await Doctor.find(query)
      .populate('hospital', 'name city')
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('hospital', 'name city')
      .populate('appointments');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, licenseNumber, specialization, hospital } = req.body;

    if (hospital) {
      const hospitalExists = await Hospital.findById(hospital);

      if (!hospitalExists) {
        return res.status(400).json({
          message: 'Hospital not found'
        });
      }
    }

    const doctor = new Doctor({
      firstName,
      lastName,
      email,
      phone,
      licenseNumber,
      specialization,
      hospital,
    });

    const saved = await doctor.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, specialization, status } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, specialization, status },
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
