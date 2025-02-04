const imageSchema = new mongoose.Schema(
  {
    image_type: {
      type: String, // Changed from Text to String
      required: true,
    },
    file_name: {
      type: String, // Changed from Text to String
      required: true,
    },
    car_id: {
      type: Number, // Changed to match car_id type
      ref: "Car",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
