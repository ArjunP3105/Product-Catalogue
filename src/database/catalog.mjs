import mongoose from "mongoose";

const catalogSchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.BigInt,
    required: true,
  },
  disconnect: mongoose.Schema.Types.BigInt,
  catogory: {
    type: mongoose.Schema.Types.String,
    enum: ["Kitechen", "Garden", "Sports"],
    required: true,
  },
});

const Catalog = mongoose.model("Catalog", catalogSchema);

export default Catalog;
