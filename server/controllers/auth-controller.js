import User from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    const { email, phone, name, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ success: false, message: "User already exists!" });

    const newUser = await User.create({ email, phone, name, password });
    const token = user.getSignedJwtToken();

    const user = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
    };

    res.status(201).json({ success: true, token, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Error creating user" });
  }
};
