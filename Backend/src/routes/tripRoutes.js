const express = require("express");

const {
    planTrip
} = require("../controllers/tripController");

const {
    adaptTrip
} = require("../controllers/whatIfController");

const router = express.Router();


// Normal trip planning
router.post("/plan", planTrip);


// What-If
router.post("/what-if", adaptTrip);


module.exports = router;