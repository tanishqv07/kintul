const express = require("express");
const { getServices, addService, deleteService } = require("../controllers/serviceController");
const {authMiddleware, roleMiddleware} = require("../middleware/authMiddleware")
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

//Get all services
router.get("/", authMiddleware,roleMiddleware("customer"), getServices);

//Add new service
router.post("/",upload.single('image'), addService);

//delete a service
router.delete("/:id",deleteService)
module.exports = router;
