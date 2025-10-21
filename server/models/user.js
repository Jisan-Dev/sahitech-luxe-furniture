import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      phone: String,
      addresses: [
        {
          street: String,
          city: String,
          state: String,
          country: String,
          zipCode: String,
          isDefault: { type: Boolean, default: false },
        },
      ],
      avatar: String,
      isActive: { type: Boolean, default: true },
      resetPasswordToken: String,
      resetPasswordExpire: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

const User = mongoose.model("User", userSchema);

export default User;
