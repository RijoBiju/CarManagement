const Car = require("../models/Car");

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

exports.getAllCarImagesLinks = async (req, res) => {
  try {
    const carId = Number(req.params.carId);
    if (isNaN(carId)) {
      return res.status(400).json({ error: "Invalid car ID" });
    }

    const car = await Car.findOne({ car_id: carId }).select("images -_id");

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(car.images || []);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.upload = async (req, res) => {
  try {
    const { carId } = req.params;
    const { tag } = req.body;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const fileName = `cars/${carId}/${Date.now()}-${req.file.originalname}`;
    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(uploadParams);

    await s3.send(command);

    const imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`;

    console.log(imageUrl);
    // Update Car document with new image
    const updatedCar = await Car.findOneAndUpdate(
      { car_id: carId }, // Match schema field name
      { $push: { images: { url: imageUrl, tag } } },
      { new: true, upsert: false } // Don't upsert, just update existing
    );

    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json({ message: "Upload successful", imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
    res.status(500).json({
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
    res.status(500).json({
      Status: 500,
      Error: "Failed to update car.",
      Details: error.message,
    });
  }
};

exports.updateVehicleDetails = async (req, res) => {
  const { carId } = req.params;
  console.log("Reached vehicle deats");
  console.log(carId);

  const {
    lotNumber,
    vin,
    titleCode,
    odometer,
    primaryDamage,
    secondaryDamage,
    estimatedRetailValue,
    cylinders,
    color,
    engineType,
    transmission,
    drive,
    vehicleType,
    fuel,
    keys,
    highlights,
  } = req.body;

  try {
    const updatedCar = await Car.findOneAndUpdate(
      { car_id: carId },
      {
        lot_number: lotNumber,
        vin,
        title_code: titleCode,
        odometer,
        primary_damage: primaryDamage,
        secondary_damage: secondaryDamage,
        estimated_retail_value: estimatedRetailValue,
        cylinders,
        color,
        engine_type: engineType,
        transmission,
        drive,
        vehicle_type: vehicleType,
        fuel,
        keys,
        highlights,
      },
      { new: true }
    );

    if (!updatedCar)
      return res.status(404).json({ Status: 404, Error: "Car not found." });

    res.status(200).json({ Status: 200, Data: updatedCar });
  } catch (error) {
    res.status(500).json({
      Status: 500,
      Error: "Failed to update vehicle details.",
      Details: error.message,
    });
  }
};

exports.updateSellingDetails = async (req, res) => {
  const { carId } = req.params;
  const { minimumSellingPrice, customerDeliveryFee, presentMarketValue } =
    req.body;

  try {
    const updatedCar = await Car.findOneAndUpdate(
      { car_id: carId },
      {
        minimum_selling_price: minimumSellingPrice,
        customer_delivery_fee: customerDeliveryFee,
        present_market_value: presentMarketValue,
      },
      { new: true }
    );

    if (!updatedCar)
      return res.status(404).json({ Status: 404, Error: "Car not found." });

    res.status(200).json({ Status: 200, Data: updatedCar });
  } catch (error) {
    res.status(500).json({
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
      minimumSellingPrice: car.minimum_selling_price,
      customerDeliveryFee: car.customer_delivery_fee,
      presentMarketValue: car.present_market_value,
      lotNumber: car.lot_number,
      vin: car.vin,
      titleCode: car.title_code,
      odometer: car.odometer,
      primaryDamage: car.primary_damage,
      secondaryDamage: car.secondary_damage,
      estimatedRetailValue: car.estimated_retail_value,
      cylinders: car.cylinders,
      color: car.color,
      engineType: car.engine_type,
      transmission: car.transmission,
      drive: car.drive,
      vehicleType: car.vehicle_type,
      fuel: car.fuel,
      keys: car.keys,
      highlights: car.highlights,
    });
  } catch (error) {
    res.status(500).json({
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
      minimumSellingPrice: car.minimum_selling_price,
    }));

    res.status(200).json(formattedCars);
  } catch (error) {
    res.status(500).json({
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
    res.status(500).json({
      Status: 500,
      Error: "Failed to update archive status.",
      Details: error.message,
    });
  }
};
