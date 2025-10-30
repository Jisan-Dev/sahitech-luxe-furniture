import User from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    const { email, phone, name, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ success: false, message: "User already exists!" });

    const newUser = await User.create({ email, phone, name, password });
    const token = newUser.getSignedJwtToken();

    res.status(201).json({ success: true, token, data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message || "Error creating user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword)) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // if (!user.isActive) {
    //   return res.status(401).json({ success: false, message: "Account is inactive" });
    // }

    const token = user.getSignedJwtToken();

    res.json({
      success: true,
      data: {
        success: true,
        token,
        user
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || "Error logging in" });
  }
};

export const getUser = async (req, res) => {
  res.json({ success: true, data: req.user });
};
