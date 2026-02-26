const mongoose = require("mongoose")

const userschema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String
    },

    mobile: {
      type: String
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"]
    },

    country: {
      type: String
    },

    avatarurl: {
      type: String,
      default: "/Third.webp"
    },

    role: {
      type: String,
      enum: ["User", "Admin", "SuperAdmin"],
      default: "User"
    }
  },
  { timestamps: true }
)

const users = mongoose.model("user", userschema)
module.exports = users