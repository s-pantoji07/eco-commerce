const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price_before_discount: { type: Number, required: true },
  price_after_discount: { type: Number, required: true },
  discount: { type: Number, required: true },
  add_to_cart: { type: Boolean, default: false },
  review: { type: Number, required: true },
  heart_button: { type: Boolean, default: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
});

module.exports = mongoose.model("Product", productSchema);
