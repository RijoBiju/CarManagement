const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find({}, "car_id brand model minimum_selling_price");
    const formattedCars = cars.map((car) => ({
      carId: car.car_id,
      company: car.brand,
      Model: car.model,
      Price: car.minimum_selling_price,
    }));

    res.status(200).json({
      Status: 200,
      Data: formattedCars,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ Status: 500, Error: "An error occurred while retrieving cars." });
  }
});

module.exports = router;
