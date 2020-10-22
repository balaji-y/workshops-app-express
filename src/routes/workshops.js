const express = require('express');
const path = require('path');
const { getWorkshops,getWorkshopById } = require('../controllers/workshops')
const router = express.Router();

router.get('/',(req,res)=>{
    let error,workshops;
    try{
        workshops=getWorkshops();
        //console.log(workshops);
    }
    catch(err){
        error = err.message;
    }

    res.render('workshops.ejs',{
        error,workshops
    })
});

router.get('/:id',(req,res)=>{
    //res.send('workshops details is served here')
    // const err = new Error('Page is under construction');
    // err.status = 500;
    // next(err);
    let error,workshop;
    try{
        workshop = getWorkshopById(req.params.id);
    }
    catch(err){
        error = err.message;
    }
    res.render('workshopDetails',{
        error,workshop
    });
});

module.exports = router;