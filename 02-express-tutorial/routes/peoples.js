const express = require("express");
const router = express.Router();
const {getPeople, addPerson} = require('../controllers/peoples');




router.get('/', getPeople);


router.post('/', addPerson)


module.exports = router