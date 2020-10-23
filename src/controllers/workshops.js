const {client } = require('../db/init');
const mongoose = require('mongoose');

const Workshop = mongoose.model('workshop');

function getWorkshops(){
    const workshops = require('../data/workshops.json');
    return workshops;
}

function getWorkshopById(id){
    const workshops = require('../data/workshops.json');
    [workshop] = workshops.filter(workshop => workshop.id === parseInt(id))
    return workshop;
    
}

async function sendWorkshops( req, res ) {
    try {
        const workshops = await Workshop.find().exec();

        res.json( workshops );
    } catch( error ) {
        res.status( 500 ).json({
            message: error.message
        });
    }
}


async function sendWorkshopById(req,res){
    const id = req.params.id;
    try{
        const workshop = await Workshop.findById(id).exec();
        res.json(workshop);
    }
    catch(error){
        res.status(404).json({
            message:error.message
        })
    }
}
module.exports = {getWorkshops,sendWorkshops,getWorkshopById,sendWorkshopById};