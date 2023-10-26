import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
  forgotPasswordToken: {
    type: String,
    default: "",
  },
  forgotPasswordExpiry: {
    type: Date,
  },
  verifyToken: {
    type: String,
    default: "",
  },
  verifyTokenExpiry: {
    type: Date,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
