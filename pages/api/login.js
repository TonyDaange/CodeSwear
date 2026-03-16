import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      console.log(req.body);
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "User not found" });
      }

      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.JWT_SECRET,
      ).toString(CryptoJS.enc.Utf8);

      if (
        req.body.email == user.email &&
        req.body.password == decryptedPassword
      ) {
        var token = jwt.sign(
          {
            name: user.name,
            email: req.body.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2d" },
        );

        console.log({ token: token });
        return res.status(200).json({ success: true, token: token });
        // return res.status(200).json({  token });
      }

      return res
        .status(200)
        .json({ success: false, error: "Invalid credentials" });
    } catch (error) {
      console.error("Login error:", error);
      return res
        .status(500)
        .json({ success: false, error: "Server error" });
    }
  } else {
    return res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
