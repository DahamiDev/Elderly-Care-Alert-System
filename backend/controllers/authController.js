const crypto = require("crypto");
const User = require("../models/user");
const Parent = require("../models/parent");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  if (!storedPassword || !storedPassword.includes(":")) return false;
  const [salt, originalHash] = storedPassword.split(":");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === originalHash;
}

exports.register = async (req, res) => {
  try {
    const { name, email, parentName, password } = req.body;

    if (!name || !email || !parentName || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create new user
    const hashedPassword = hashPassword(password);
    const user = new User({
      name,
      email,
      parentName,
      password: hashedPassword,
    });

    await user.save();

    // Automatically create a corresponding Parent entry in the database so the child dashboard shows it immediately
    const parent = new Parent({
      name: parentName,
      relationship: "Parent",
      phone: "+94 77 123 4567",
      telegramChatId: "123456789",
      checkinStatus: "Pending",
    });
    await parent.save();

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        parentName: user.parentName,
      },
    });
  } catch (err) {
    console.error("Error during register:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isValid = verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        parentName: user.parentName,
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};

//Handles user registration (Sign Up).
//Handles user login (Sign In).
//Encrypts (hashes) passwords for security.
//Checks passwords during login.
