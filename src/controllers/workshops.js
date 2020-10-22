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
    [workshop] = workshops.filter(workshop => workshop.id === parseInt(req.params.id))
    res.json(workshop)
}

function sendWorkshops( req,res ){
    const workshops = require('../data/workshops.json');
    res.json(workshops);
}

module.exports = {getWorkshops,sendWorkshops,getWorkshopById,sendWorkshopById};