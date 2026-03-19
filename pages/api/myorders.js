import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  const token = req.body.token;
  const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  //   console.log(data);
  let orders = await Order.find({
    email: data.email,
    status: { $in: ["Paid", "Pending"] },
  });

  res.status(200).json({ orders });
};

export default connectDb(handler);
