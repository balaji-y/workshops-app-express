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

async function sendWorkshops( req, res ,next) {
    try {
        const workshops = await Workshop.find().exec();
        res.json( workshops );
    } catch( error ) {
        error.status = 500;
        next(error);
    }
}


async function sendWorkshopById(req,res,next){
    const id = req.params.id;
    try{
        const workshop = await Workshop.findById(id).exec();
        res.json(workshop);
    }
    catch(error){
        error.status =404;
        next(error);
    }
};

async function addWorkshops( req,res ,next){
    const data = req.body;
    let workshops;

    if( typeof data === 'object' && Object.keys(data).length ===0 )
    {
        const error = new Error('Workshops is missing..');
        error.status = 400;
        next(error);
    }
    if(data instanceof Array){
        workshops = data;
    }
    else 
    {
        workshops =[data];
    }

    try{
        const updatedWorkshops = await Workshop.insertMany( workshops );
        res.status(201).json(updatedWorkshops);
    }
    catch(error)
    {
        //@todo 400,500 error based on condition
        error.status = 500;
        next(error);
    }

}

async function updateWorkshopById( req,res, next ){
    const id = req.params.id;
    const data = req.body;

    let workshop = data;

    if( typeof data === 'object' && Object.keys(data).length ===0 )
    {
        const error = new Error('Workshops is missing..');
        error.status = 400;
        next(error);
    }

    const modes = workshop.modes || [];
    delete workshop.modes;

   
    try{
        const updatedWorkshop = await Workshop.findByIdAndUpdate(id,{$set : workshop , $addToSet:{modes}});
        res.json(updatedWorkshop);
    }
    catch(error)
    {
        //@todo 400,500 error based on condition
        error.status = 500;
        next(error);
    }


}

async function deleteWorkshopById(req,res,next){
    const id = req.params.id;

    try{
        // const check = await Workshop.find({id}).exec();
        // //console.log(check);
        // if(check instanceof Array && check.length ===0)
        // {
        //     res.status(400).send('item doesnt exist');
        // }
        const removedItem = await Workshop.findByIdAndRemove(id);
        console.log(removedItem);
        if(removedItem){
            res.status(204).send();
        }
        else{
            const error = new Error('document not exists');
            error.status = 404;
            next(error);
        }
    
    }
    catch(error){
        error.status = 404;
        next(error);
    }
    
}

async function sendSessionsForWorkshopById(req,res,next){
    const id = req.params.id;
    try{
        const sessions = await Workshop.findById(id).select('sessions').exec();
        res.json(sessions);
    }
    catch(error){
        error.status = 500;
        next(error);
    }
};

async function addSessionsForWorkshopsId(req,res,next){
    const id = req.params.id;
    const data = req.body;

    let sessions;

    if(data instanceof Object && Object.keys(data).length ===0)
    {
        const error = new Error('data cannot be empty');
        error.status = 400;
        next(error);
    }

    if(data instanceof Array){
        sessions = data;
    }
    else{
        sessions = [data];
    }

    try{
        const addedSessions = await Workshop.findByIdAndUpdate(id, { $addToSet: { sessions } });
        res.status(201).json( addedSessions );
    }
    catch(error){
        error.status = 500;
        next(error);
    }
}

module.exports = {
    getWorkshops,
    sendWorkshops,
    getWorkshopById,
    sendWorkshopById,
    addWorkshops,
    updateWorkshopById,
    deleteWorkshopById,
    sendSessionsForWorkshopById,
    addSessionsForWorkshopsId
};