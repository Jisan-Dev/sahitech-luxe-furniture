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
      limit = 10,
      page = 1,
      search,
      isFeatured,
      inSale,
    } = req.query;

    const query = { isActive: true };

    if (category) query.category = category;

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

    let products;
    if (search) {
      products = await Product.find(query, { score: { $meta: "textScore" } })
        .sort(sortOption)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));
    } else {
      products = await Product.find(query)
        .sort(sortOption)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));
    }

    res.json({
      success: true,
      count: products?.length,
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
