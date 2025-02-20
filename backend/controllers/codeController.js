import { Code } from "../models/Code.js";

export const saveCode = async (req, res) => {
  const { roomId, code, language } = req.body;
  try {
    let existingCode = await Code.findOne({ roomId });
    if (existingCode) {
      existingCode.code = code;
      existingCode.language = language;
      await existingCode.save();
    } else {
      await Code.create({ roomId, code, language });
    }
    res.status(200).json({ message: "Code saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving code", error });
  }
};

export const getCode = async (req, res) => {
  const roomId = String(req.params.roomId); // Force it to string

  try {
    console.log("🔍 Searching for Room ID:", roomId); // Debugging
    const code = await Code.findOne({ roomId });

    if (!code) {
      console.log("⚠️ Code not found for Room ID:", roomId); // Debugging
      return res.status(404).json({ message: "Code not found" });
    }

    res.status(200).json(code);
  } catch (error) {
    console.error("❌ Error fetching code:", error);
    res.status(500).json({ message: "Error fetching code", error });
  }
};
