const express = require("express");
const router = express.Router();
const carController = require("../controller/carController");

const { body } = require("express-validator");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/cars",
  body("carBrand").isLength({ min: 1, max: 50 }),
  body("carPlate").isLength({ min: 1, max: 15 }),
  body("carModel").isLength({ min: 1, max: 50 }),
  carController.addCar
);
router.patch("/cars/:carId/basic", carController.updateBasicDetails);
router.patch("/cars/:carId/selling", carController.updateSellingDetails);
router.patch(
  "/cars/:carId/vehicle-details",
  carController.updateVehicleDetails
);

router.get("/cars/:carId", carController.getCarById);
router.get("/cars", carController.getAllCars);

router.patch("/cars/:carId/archive", carController.toggleArchive);

router.post("/cars/:carId/image", upload.single("image"), carController.upload);
router.get("/car/:carId/image", carController.getAllCarImagesLinks);

module.exports = router;
