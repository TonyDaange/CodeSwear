import connectDb from "../../middleware/mongoose";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method == "POST") {
     console.log(req.body);
     
    let user = new User(req.body);
   //  let user = new User({
   //    name: req.body.name,
   //    email: req.body.email,
   //    password: req.body.password,
   //  });
     await user.save();
     console.log(user);

    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
