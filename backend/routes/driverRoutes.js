const express = require('express');
const Driver = require('../models/Driver');
const router = express.Router();

// POST - Register a new driver
router.post('/add', async (req, res) => {
    try {
        const { driverId, name, licenseNumber, contactNumber } = req.body;

        // Check if driver already exists
        const existingDriver = await Driver.findOne({ driverId });
        if (existingDriver) {
            return res.status(400).json({ message: '❌ Driver ID already exists' });
        }

        const newDriver = new Driver({ driverId, name, licenseNumber, contactNumber });

        await newDriver.save(); // Save driver to DB
        res.status(201).json({ message: '✅ Driver added successfully', driver: newDriver });

    } catch (error) {
        res.status(500).json({ message: `❌ Error: ${error.message}` });
    }
});

// ✅ GET - Retrieve all drivers
router.get('/list', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: `❌ Error: ${error.message}` });
    }
});

// ✅ PUT - Update driver details
router.put('/update/:driverId', async (req, res) => {
    try {
        const { name, contactNumber } = req.body;

        // Find driver by driverId
        const driver = await Driver.findOne({ driverId: req.params.driverId });

        if (!driver) {
            return res.status(404).json({ message: '❌ Driver not found' });
        }

        // Update fields if provided
        if (name) driver.name = name;
        if (contactNumber) driver.contactNumber = contactNumber;

        await driver.save(); // Save updated driver
        res.status(200).json({ message: '✅ Driver updated successfully', driver });

    } catch (error) {
        res.status(500).json({ message: `❌ Error: ${error.message}` });
    }
});

// ✅ DELETE - Remove driver
router.delete('/delete/:driverId', async (req, res) => {
    try {
        const driver = await Driver.findOneAndDelete({ driverId: req.params.driverId });

        if (!driver) {
            return res.status(404).json({ message: '❌ Driver not found' });
        }

        res.status(200).json({ message: `✅ Driver with ID ${req.params.driverId} deleted successfully` });

    } catch (error) {
        res.status(500).json({ message: `❌ Error: ${error.message}` });
    }
});

module.exports = router;
