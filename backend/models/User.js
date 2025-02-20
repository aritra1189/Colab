import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true,}, // Add sparse: true
  email: { type: String, unique: true },
  password: { type: String },
});

export const User = mongoose.model("User", UserSchema);
