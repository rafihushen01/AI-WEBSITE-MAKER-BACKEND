const User = require("../models/User")
const bcrypt = require("bcryptjs")
const gentoken = require("../utils/Token")

// ==========================================
// 🚀 SIGNUP CONTROLLER
// ==========================================
exports.signup = async (req, res) => {
  try {
    const { fullname, email, password, mobile, gender, country } = req.body

    // ===============================
    // 🔎 Basic Validation
    // ===============================
    if (!fullname || fullname.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Fullname must be at least 3 characters long"
      })
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      })
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long"
      })
    }

    if (!mobile || mobile.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must be at least 10 digits"
      })
    }

    // Normalize email
    const normalizedemail = email.toLowerCase().trim()

    // ===============================
    // 🔎 Check Existing User
    // ===============================
    const existinguser = await User.findOne({ email: normalizedemail })

    if (existinguser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      })
    }

    // ===============================
    // 🔐 Hash Password
    // ===============================
    const hashpass = await bcrypt.hash(password, 12)

    // ===============================
    // 🖼 Avatar Logic
    // ===============================
    let avatarurl = "/Third.webp"

    if (gender === "Male") avatarurl = "/Men.png"
    if (gender === "Female") avatarurl = "/women.jpg"

    // ===============================
    // 👤 Create User
    // ===============================
    const newuser = await User.create({
      fullname: fullname.trim(),
      email: normalizedemail,
      password: hashpass,
      mobile,
      gender,
      country,
      avatarurl,
      role: "User" // Default Role
    })

    // ===============================
    // 🔑 Generate Token
    // ===============================
    const token = gentoken(newuser._id)

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
    })

    return res.status(201).json({
      success: true,
      message: "User signup successful"
    })

  } catch (error) {
    console.error("Signup Error:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}


// ==========================================
// 🚀 SIGNIN CONTROLLER
// ==========================================
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      })
    }

    const normalizedemail = email.toLowerCase().trim()

    const existinguser = await User.findOne({ email: normalizedemail })

    if (!existinguser) {
      return res.status(400).json({
        success: false,
        message: "Account not found"
      })
    }

    // Correct password compare
    const matchpass = await bcrypt.compare(password, existinguser.password)

    if (!matchpass) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password"
      })
    }

    const token = gentoken(existinguser._id)

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
      success: true,
      message: "Signin successful"
    })

  } catch (error) {
    console.error("Signin Error:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}
