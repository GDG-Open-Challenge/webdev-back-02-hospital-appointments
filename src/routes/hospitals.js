const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');

router.get('/', async (req, res) => {
  try {
    const hospitals = await Hospital.find()
      .populate('doctors', 'firstName lastName specialization');

    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id)
      .populate('doctors', 'firstName lastName specialization email');

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.json(hospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, city, state, phone, email, totalBeds, departments } = req.body;

    const hospital = new Hospital({
      name,
      city,
      state,
      phone,
      email,
      totalBeds,
      departments,
    });

    const saved = await hospital.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, phone, email, status } = req.body;

    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      { name, phone, email, status },
      { new: true, runValidators: true }
    );

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.json(hospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.json({ message: 'Hospital deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
