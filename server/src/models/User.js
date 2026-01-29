import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    role: { type: String, default: "user" },
    banned: { type: Boolean, default: false },
    // Additional fields can be managed by better-auth via strict: false
  },
  { strict: false },
);

export default mongoose.model("User", userSchema, "user");
