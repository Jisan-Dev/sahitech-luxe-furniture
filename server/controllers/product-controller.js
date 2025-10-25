import Category from "../models/category.js";
import Product from "../models/product.js";

// Get all products with optional filters
export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      inStock,
      sort,
      limit = 12,
      page = 1,
      search,
      isFeatured,
      inSale,
    } = req.query;

    const query = { isActive: true };

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) query.category = categoryDoc._id;
      else if (category === "all") {
        query.category = {
          $exists: true,
        }; //→ creates a MongoDB filter condition that matches documents where the field category exists (even if it’s null or any valid ObjectId).
      } else return res.status(404).json({ success: false, message: "Category not found!" });
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) query.$text = { $search: search };

    if (inStock === "true") query.inStock = true;
    if (isFeatured === "true") query.isFeatured = true;
    if (inSale === "true") query.inSale = true;

    const sortOption = {};
    if (sort === "price-asc") sortOption.price = 1;
    else if (sort === "price-desc") sortOption.price = -1;
    else if (sort === "name") sortOption.name = 1;
    else sortOption.createdAt = -1;

    if (search) sortOption.score = { $meta: "textScore" };

    let projection = search ? { score: { $meta: "textScore" } } : {};
    const products = await Product.find(query, projection)
      .sort(sortOption)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .populate("category", "name slug");

    // const count =

    res.json({
      success: true,
      count: products?.length,
      totalPages: Math.ceil(products?.length / Number(limit)),
      currentPage: Number(page),
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) return res.status(404).json({ success: false, message: "Product not found!" });

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};
