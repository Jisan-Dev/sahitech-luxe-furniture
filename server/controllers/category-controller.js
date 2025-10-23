import Category from "../models/category.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).populate("parent", "name slug");
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: error.message || "Error fetching categories",
        error: error,
      });
  }
};
