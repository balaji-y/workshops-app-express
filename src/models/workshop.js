const mongoose = require( 'mongoose' );


const sessionSchema = new mongoose.Schema({
    sequenceId : Number,
    name:{
        type:String,
        required:true
    },
    speaker: {
        type:String,
        required:true
    },
    duration: {
        type:Number,
        required:true
    },
    level:{
        type:String,
        enum: ['Basic','Intermediate','Advanced']
    },
    description:String,
    votes:{
        type:Number,
        default: 0
    }
});

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
    sessions:{
        type: [sessionSchema],
        default: []
    },
    imageUrl: String
});

mongoose.model( 'workshop', workshopSchema );