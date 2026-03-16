import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async (req, res) => {
  // if (req.method === "POST") {
  //   console.log(req.body);    
  //   let { email, orderId, paymentInfo, products, address, amount } = req.body;
  //   let order = new Order({
  //     email,
  //     orderId,
  //     // paymentInfo,
  //     // products,
  //     address,
  //     amount,
  //   });
  //   await order.save();
  //   console.log(order);

  //   return res.status(200).json({ success: true, orderId: order._id });
  // } else {
  //   return res.status(400).json({ error: "This method is not allowed" });
  // }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const amount = Math.round(Number(req.body.subTotal) * 100);
    if (!amount || amount < 100) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const keyIdRaw =
      process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecretRaw = process.env.RAZORPAY_KEY_SECRET;
    const keyId = keyIdRaw ? keyIdRaw.trim() : "";
    const keySecret = keySecretRaw ? keySecretRaw.trim() : "";

    if (!keyId || !keySecret) {
      return res.status(500).json({ error: "Razorpay keys are missing" });
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
      razorpayOrder = { error: "Invalid JSON from Razorpay", raw: responseText };
    }
    if (!orderResponse.ok) {
      console.error("Razorpay order error:", orderResponse.status, razorpayOrder);
      return res.status(orderResponse.status).json(razorpayOrder);
    }

    console.log(req.body);
    const { email, paymentInfo, products, address } = req.body;
    const productsToSave = products || req.body.cart;
    if (!productsToSave || Object.keys(productsToSave).length === 0) {
      return res.status(400).json({ error: "Products are required" });
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

    return res.status(200).json({ ...razorpayOrder, orderId: order._id });
  } catch (error) {
    console.error("Pretransaction error:", error);
    return res.status(500).json({
      error: "Failed to create Razorpay order",
      message: error?.message,
    });
  }
};

export default connectDb(handler);
