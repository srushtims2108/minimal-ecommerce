import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: { type: String }, // used for forgot password feature
  resetTokenExpiry: { type: Date }, // timestamp for expiry
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
