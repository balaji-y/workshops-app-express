const mongoose = require( 'mongoose' );

const workshopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    startTime: String,
    endTime: String,
    location: {
        address: String,
        city: String,
        state: String
    },
    modes: {
        type: [ String ],
        default: []
    },
    imageUrl: String
});

mongoose.model( 'workshop', workshopSchema );