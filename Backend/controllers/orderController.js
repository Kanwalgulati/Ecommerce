const Order = require("../models/orderModels");
const Product = require("../models/productModel");

const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Create New Order
exports.newOrder = CatchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({ success: true, order });
});

//Get Order Details
exports.getSingleOrder = CatchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }
  res.status(200).json({ success: true, order });
});
//Get Logged in User Order Details
exports.myOrders = CatchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  res.status(200).json({ success: true, order });
});

//get All Orders  -- Admin

exports.getAllOrders = CatchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res
    .status(200)
    .json({ success: true, orders, totalAmount, totalOrders: orders.length });
});

//Update Order Status-- Admin

exports.updateOrderStatus = CatchAsyncErrors(async (req, res, next) => {
  const orders = await Order.findById(req.params.id);
  if (!orders) {
    return next(new ErrorHandler("Order Not Found with this ID", 404));
  }
  if (orders.orderStatus === "Delivered") {
    return next("You have already delivered this order", 400);
  }
  if (req.body.status === "Shipped") {
    orders.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }
  orders.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    orders.deliveredAt = Date.now();
  }
  await orders.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

//Delete Order

exports.deleteOrder = CatchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order Not found with this ID ", 404));
  }
  await order.remove();

  res.status(200).json({ success: true });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.Stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
