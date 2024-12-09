const express = require("express");
const Vehicle = require("../db/Vehicle");
const router = express.Router();


router.post("/api/vehicles", async (req, res) => {
  try {
    console.log("Request body:");
    const { carModel, price, phoneNumber, city, images, userId } = req.body;


    if (!carModel || !price || !phoneNumber || !city || !images || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newVehicle = new Vehicle({
      carModel,
      price,
      phoneNumber,
      city,
      images,
      userId,
    });

   
    await newVehicle.save();

    res.status(201).json({ message: "Vehicle added successfully", vehicle: newVehicle });
  } catch (error) {
    console.error("Error saving vehicle:", error);
    res.status(500).json({ message: "Failed to save vehicle", error: error.message });
  }
});

module.exports = router;
