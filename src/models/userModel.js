import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: [true, "Please add a name"],
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
  family: {
    type: Array,
    default: [],
  },
  friends: {
    type: Array,
    default: [],
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  amtCode: {
    type: String,
    default: "",
  },
  identity: {
    surname: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      default: "",
    },
    nationality: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: String,
      default: "",
    },
    placeOfBirth: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  taxId: {
    type: String,
    default: "",
  },
  zipCode: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "user",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  authToken: {
    type: String,
    default: "",
  },
  authTokenExpiry: {
    type: Date,
    default: "",
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
  signature: {
    type: String,
    default: "",
  },
  notifications: {
    type: Array,
    default: [],
  },
  messages: {
    type: Array,
    default: [],
  }
});

const User = mongoose.models.UserOnly || mongoose.model("UserOnly", userSchema);

export default User;
