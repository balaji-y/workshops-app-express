const mongoose = require('mongoose');
const { seed } =require('./seed');

require('../models/workshop');

const uri = 'mongodb://localhost:27017/workshops-app';

mongoose.set('useFindAndModify',false);
mongoose.set('returnOriginal',false);

mongoose.connect(uri, { useNewUrlParser:true,useUnifiedTopology:true});

mongoose.connection.on('open',()=>{
    console.log('connected to db');

    //uncomment seed only when you need to upload files to collection
    //seed();
});

mongoose.connection.on('error', (err) =>{
    console.error(err.message);
    process.exit();
});