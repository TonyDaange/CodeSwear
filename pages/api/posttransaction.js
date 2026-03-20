import crypto from "crypto";
import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import Product from "../../models/Product";

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

    const keyIdRaw =
      process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecretRaw = process.env.RAZORPAY_KEY_SECRET;
    const keyId = keyIdRaw ? keyIdRaw.trim() : "";
    const keySecret = keySecretRaw ? keySecretRaw.trim() : "";
    if (!keyId || !keySecret) {
      return res
        .status(500)
        .json({ success: false, error: "Missing Razorpay keys" });
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

    const order = await Order.findOne({ orderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    if (order.status === "Paid") {
      return res.status(200).json({
        success: true,
        paymentId: razorpay_payment_id,
        orderId: order._id,
        alreadyPaid: true,
      });
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const payRes = await fetch(
      `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`,
      {
        method: "GET",
        headers: { Authorization: `Basic ${auth}` },
      },
    );

    const payText = await payRes.text();
    let payment = {};
    try {
      payment = payText ? JSON.parse(payText) : {};
    } catch {
      payment = { error: "Invalid JSON from Razorpay", raw: payText };
    }
    if (!payRes.ok) {
      return res
        .status(payRes.status)
        .json({ success: false, error: "Payment fetch failed", ...payment });
    }

    const expectedAmount = Math.round(Number(order.amount) * 100);
    if (
      payment.amount !== expectedAmount ||
      payment.currency !== "INR" ||
      payment.status !== "captured"
    ) {
      return res.status(400).json({
        success: false,
        error: "Payment mismatch",
        details: {
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
        },
      });
    }

    const updated = await Order.findOneAndUpdate(
      { _id: order._id, status: { $ne: "Paid" } },
      {
        status: "Paid",
        paymentInfo: JSON.stringify(req.body),
        transactionId: req.body.razorpay_payment_id,
      },
      { new: true },
    );
    if (!updated) {
      return res.status(409).json({ success: false, error: "Already paid" });
    }

    let products = updated.products;
    for (let slug in products) {
      // log(products[slug].qty);
      await Product.findOneAndUpdate(
        { slug: slug },
        { $inc: { availableQty: -products[slug].qty } },
      );
    }
    return res.status(200).json({
      success: true,
      paymentId: razorpay_payment_id,
      orderId: updated._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Verification failed" });
  }
};
export default connectDb(handler);
