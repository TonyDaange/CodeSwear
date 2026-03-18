import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import Product from "../../models/Product";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    let product,
      sumtotal = 0;
    let cart = req.body.cart;
    for (let item in cart) {
      console.log(item);
      sumtotal += cart[item].price * cart[item].qty;
      product = await Product.findOne({ slug: item });
      if (product.price != cart[item].price) {
        res.status(406).json({
          success: false,
          error:
            "The price of some items in your cart have changed. Please try again",
        });
        return;
      }
    }
    if (sumtotal !== req.body.subTotal) {
      res.status(406).json({
        success: false,
        error:
          "The price of some items in your cart have changed. Please try again",
      });
      return;
    }

    const amount = Math.round(Number(req.body.subTotal) * 100);
    if (!amount || amount < 100) {
      return res.status(400).json({ success: false, error: "Invalid amount" });
    }

    const keyIdRaw =
      process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecretRaw = process.env.RAZORPAY_KEY_SECRET;
    const keyId = keyIdRaw ? keyIdRaw.trim() : "";
    const keySecret = keySecretRaw ? keySecretRaw.trim() : "";

    if (!keyId || !keySecret) {
      return res
        .status(500)
        .json({ success: false, error: "Razorpay keys are missing" });
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const orderResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: String(req.body.oid || Date.now()),
      }),
    });

    const responseText = await orderResponse.text();
    let razorpayOrder;
    try {
      razorpayOrder = responseText ? JSON.parse(responseText) : {};
    } catch {
      razorpayOrder = {
        error: "Invalid JSON from Razorpay",
        raw: responseText,
      };
    }
    if (!orderResponse.ok) {
      console.error(
        "Razorpay order error:",
        orderResponse.status,
        razorpayOrder,
      );
      return res
        .status(orderResponse.status)
        .json({ success: false, ...razorpayOrder });
    }

    console.log(req.body);
    const { email, paymentInfo, products, address } = req.body;
    const productsToSave = products || req.body.cart;
    if (!productsToSave || Object.keys(productsToSave).length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Products are required" });
    }

    const success = Boolean(razorpayOrder && razorpayOrder.id);
    if (!success) {
      return res.status(500).json({
        success: false,
        error: "Failed to create Razorpay order",
        raw: razorpayOrder,
      });
    }

    const order = new Order({
      email,
      orderId: razorpayOrder?.id || String(req.body.oid || Date.now()),
      paymentInfo,
      products: productsToSave,
      address,
      amount: amount / 100,
    });
    await order.save();
    console.log(order);

    return res
      .status(200)
      .json({ ...razorpayOrder, orderId: order._id, success: true });
  } catch (error) {
    console.error("Pretransaction error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to create Razorpay order",
      message: error?.message,
    });
  }
};

export default connectDb(handler);
