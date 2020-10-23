const {client } = require('../db/init');

function getWorkshops(){
    const workshops = require('../data/workshops.json');
    return workshops;
}

function getWorkshopById(id){
    const workshops = require('../data/workshops.json');
    [workshop] = workshops.filter(workshop => workshop.id === parseInt(id))
    return workshop;
    
}

function sendWorkshopById(req,res){
    const workshops = require('../data/workshops.json');
    workshop = workshops.find(workshop => workshop.id === parseInt(req.params.id))
    res.json(workshop)
}

async function sendWorkshops( req,res ){
    const database = client.db('workshops-app');
    const collection = database.collection('workshops');
    const query = {};

    try {
        const workshops = await collection.find( query ).toArray();
        res.json( workshops );
    } catch( error ) {
        res.status( 500 ).json({
            message: error.message
        });
    }
}

module.exports = {getWorkshops,sendWorkshops,getWorkshopById,sendWorkshopById};