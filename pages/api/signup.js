import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    let {name, email} = req.body;
    // let {name, email, password} = req.body;
    // console.log(CryptoJS.HmacSHA1("Message", "Key"));
    // let user = new User(req.body);
    let user = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.JWT_SECRET).toString()});
     await user.save();
     console.log(user);

    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
