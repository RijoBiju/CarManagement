const Car = require("../../models/Car");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }

  const { carBrand, carModel, carPlate } = req.body;

  try {
    const newCar = new Car({
      car_id: Date.now(),
      brand: carBrand,
      model: carModel,
      car_plate: carPlate,
    });

    const savedCar = await newCar.save();
    res.status(201).json({ Status: 201, Data: savedCar });
  } catch (error) {
    res.status(500).json({
      Status: 500,
      Error: "Failed to add car.",
      Details: error.message,
    });
  }
};
