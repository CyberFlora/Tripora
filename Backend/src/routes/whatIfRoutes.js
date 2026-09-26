const express = require("express");

const {
    adaptTrip
} = require("../controllers/whatIfController");


const router = express.Router();


router.post("/", adaptTrip);


module.exports = router;