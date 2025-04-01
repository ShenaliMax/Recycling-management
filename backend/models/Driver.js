const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    driverId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    assignedTruckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck' }, // Reference to Truck model
    contactNumber: { type: String, required: true },
    status: { type: String, default: 'active' } // active, inactive
});

// Ensure indexes are created correctly
driverSchema.index({ driverId: 1 }, { unique: true });

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
