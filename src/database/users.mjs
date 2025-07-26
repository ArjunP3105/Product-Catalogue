import mongoose from "mongoose";

//create a user schema that contains the fields for the model
const userSchema = mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.String,
    default: "customer",
  },
});

//then we create the model with the schema

export const Users = mongoose.model("User", userSchema);

/* {
  "username":"arjun",
  "password" :"pass123"
} */
