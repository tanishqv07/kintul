const express = require("express");
const { getServices, addService } = require("../controllers/serviceController");

const router = express.Router();

//Get all services
router.get("/", getServices);

//Add new service
router.post("/", addService);

module.exports = router;
