const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index',{
        title:'Workshops app|Home',
        appTitle: 'Workshops-App v2'
    });

    
});

module.exports = router;