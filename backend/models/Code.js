import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Code = mongoose.model("Code", CodeSchema);
