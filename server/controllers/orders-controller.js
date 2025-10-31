import Order from "../models/orders.js";
import Product from "../models/product.js";

// get orders data
export const getOrders = async (req, res) => {
  try {
    const query = req.user.role === "admin" ? {} : { user: req.user._id };
    const orders = await Order.find(query)
      .populate("user", "name email")
      .populate("items.product", "name")
      .sort("-createdAt");

    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// get order by id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (req.user.role !== "admin" && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message,
    });
  }
};

// create new order
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, shippingAmount = 0, taxAmount = 0 } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No order items provided" });
    }

    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product)
        return res
          .status(404)
          .json({ success: false, message: `Product not found: ${item.productId}` });

      if (product.stock < item.quantity)
        return res
          .status(400)
          .json({ success: false, message: `Insufficient stock for product: ${product.name}` });

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.inSale ? product.salePrice : product.price,
        image: product.images[0]?.url || "",
      });

      subtotal += (product.inSale ? product.salePrice : product.price) * item.quantity;

      product.stock -= item.quantity;
      await product.save();
    }

    const totalAmount = subtotal + taxAmount + shippingAmount;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      taxAmount,
      shippingAmount,
      totalAmount,
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};
