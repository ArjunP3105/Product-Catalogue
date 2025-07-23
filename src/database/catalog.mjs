import mongoose from "mongoose";

const catalogSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  disconnect: mongoose.Schema.Types.Decimal128,
  category: {
    type: String,
    enum: ["Kitchen", "Garden", "Sports"],
    required: true,
  },
});

export const Catalog = mongoose.model("Catalog", catalogSchema);
