const mongoose = require("mongoose");

const userLockoutSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  lockedUntil: {
    type: Date,
    default: null,
  },
});

const UserLockout =
  mongoose.models.UserLockout2 ||
  mongoose.model("UserLockout2", userLockoutSchema);

export default UserLockout;
