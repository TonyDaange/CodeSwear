import crypto from "crypto";
import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return res
        .status(500)
        .json({ success: false, error: "Missing Razorpay secret key" });
    }

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid signature" });
    }

    const order = await Order.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { status: "Paid", paymentInfo: JSON.stringify(req.body) },
      { new: true }
    );
    if (!order) {
      return res
        .status(404)
        .json({ success: false, error: "Order not found" });
    }
    // Order.findByIdAndUpdate(order._id, { status: "Paid" }, { new: true });
    return res
      .status(200)
      .json({ success: true, paymentId: razorpay_payment_id });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Verification failed" });
  }
};
export default connectDb(handler);
