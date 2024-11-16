const Car = require("../models/Car");

exports.addCar = async (req, res) => {
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
    res
      .status(500)
      .json({
        Status: 500,
        Error: "Failed to add car.",
        Details: error.message,
      });
  }
};

exports.updateBasicDetails = async (req, res) => {
  const { carId } = req.params;
  const { carBrand, carModel, carPlate, yearOfManufacture, mileage } = req.body;

  try {
    const updatedCar = await Car.findOneAndUpdate(
      { car_id: carId },
      {
        brand: carBrand,
        model: carModel,
        car_plate: carPlate,
        year_of_manufacture: yearOfManufacture,
        mileage,
      },
      { new: true }
    );

    if (!updatedCar)
      return res.status(404).json({ Status: 404, Error: "Car not found." });

    res.status(200).json({ Status: 200, Data: updatedCar });
  } catch (error) {
    res
      .status(500)
      .json({
        Status: 500,
        Error: "Failed to update car.",
        Details: error.message,
      });
  }
};

exports.updateSellingDetails = async (req, res) => {
  const { carId } = req.params;
  const { msp, customerDeliveryFees, marketValue } = req.body;

  try {
    const updatedCar = await Car.findOneAndUpdate(
      { car_id: carId },
      {
        minimum_selling_price: msp,
        customer_delivery_fee: customerDeliveryFees,
        present_market_value: marketValue,
      },
      { new: true }
    );

    if (!updatedCar)
      return res.status(404).json({ Status: 404, Error: "Car not found." });

    res.status(200).json({ Status: 200, Data: updatedCar });
  } catch (error) {
    res
      .status(500)
      .json({
        Status: 500,
        Error: "Failed to update selling details.",
        Details: error.message,
      });
  }
};

exports.getCarById = async (req, res) => {
  const { carId } = req.params;

  try {
    const car = await Car.findOne({ car_id: carId });

    if (!car)
      return res.status(404).json({ Status: 404, Error: "Car not found." });

    res.status(200).json({
      carId: car.car_id,
      carBrand: car.brand,
      carModel: car.model,
      carPlate: car.car_plate,
      yearOfManufacture: car.year_of_manufacture,
      mileage: car.mileage,
      MinimumSellingPrice: car.minimum_selling_price,
      CustomerDeliveryFee: car.customer_delivery_fee,
      PresentMarketValue: car.present_market_value,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        Status: 500,
        Error: "Failed to retrieve car details.",
        Details: error.message,
      });
  }
};

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({ archived: false });

    const formattedCars = cars.map((car) => ({
      carId: car.car_id,
      carBrand: car.brand,
      carModel: car.model,
      carPlate: car.car_plate,
      yearOfManufacture: car.year_of_manufacture,
      mileage: car.mileage,
      MinimumSellingPrice: car.minimum_selling_price,
    }));

    res.status(200).json(formattedCars);
  } catch (error) {
    res
      .status(500)
      .json({
        Status: 500,
        Error: "Failed to retrieve cars.",
        Details: error.message,
      });
  }
};

exports.toggleArchive = async (req, res) => {
  const { carId } = req.params;
  const { archive } = req.body;

  try {
    const updatedCar = await Car.findOneAndUpdate(
      { car_id: carId },
      { archived: archive },
      { new: true }
    );

    if (!updatedCar)
      return res.status(404).json({ Status: 404, Error: "Car not found." });

    res.status(200).json({ Status: 200, Data: updatedCar });
  } catch (error) {
    res
      .status(500)
      .json({
        Status: 500,
        Error: "Failed to update archive status.",
        Details: error.message,
      });
  }
};
