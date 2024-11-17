const express = require("express");
const router = express.Router();
const carController = require("../controller/carController");

router.post("/cars", carController.addCar);
router.patch("/cars/:carId/basic", carController.updateBasicDetails);
router.patch("/cars/:carId/selling", carController.updateSellingDetails);
router.get("/cars/:carId", carController.getCarById);
router.get("/cars", carController.getAllCars);
router.patch("/cars/:carId/archive", carController.toggleArchive);

module.exports = router;
