const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    let user = await User.findOne({ email });

    // If user doesn't exist, create new user (auto-register)
    if (!user) {
    
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashedPassword });
      await user.save();
      return res.json({
        message: "User registered and logged in successfully",
        userId: user._id,
      });
    }

    // If user exists, verify password
   
    const isMatch = await bcrypt.compare(password, user.password);
  

    if (!isMatch) {
      
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", userId: user._id });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Remove or keep register for optional use
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
