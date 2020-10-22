const express = require('express');
const path = require('path');
const {sendWorkshops,sendWorkshopById} =require("../../controllers/workshops");

const router = express.Router();

router.get('/', sendWorkshops);

router.get('/:id',sendWorkshopById);

module.exports = router;