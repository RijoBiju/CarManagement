const express = require("express");
const router = express.Router();
const multer = require("multer"); // Import multer
const carController = require("../controller/carController");

const storage = multer.memoryStorage(); // Store file in memory (or use diskStorage for saving to disk)
const upload = multer({ storage: storage });

router.post("/cars", carController.addCar);
router.patch("/cars/:carId/basic", carController.updateBasicDetails);
router.patch("/cars/:carId/selling", carController.updateSellingDetails);
router.patch(
  "/cars/:carId/vehicle-details",
  carController.updateVehicleDetails
);

router.get("/cars/:carId", carController.getCarById);
router.get("/cars", carController.getAllCars);

router.patch("/cars/:carId/archive", carController.toggleArchive);

router.post(
  "/cars/:carId/upload",
  upload.single("image"),
  carController.upload
);

module.exports = router;
