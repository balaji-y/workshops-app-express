const express = require('express');
const path = require('path');
const {sendWorkshops,sendWorkshopById,updateWorkshopById,addWorkshops,deleteWorkshopById,sendSessionsForWorkshopById,addSessionsForWorkshopsId} =require("../../controllers/workshops");

const router = express.Router();

router.get('/', sendWorkshops);
router.get('/:id',sendWorkshopById);
router.post('/',addWorkshops);
router.patch('/:id', updateWorkshopById);
router.delete('/:id', deleteWorkshopById);
router.get('/:id/sessions', sendSessionsForWorkshopById);
router.patch('/:id/sessions', addSessionsForWorkshopsId);
router.put('/:id',(req,res)=>{
    res.status(405).send();
})

module.exports = router;