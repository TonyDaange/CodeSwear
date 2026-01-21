import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    for (let i = 0; i < req.body.length; i++) {
       let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i]
      //  {
      //   name: req.body[i].name,
      //   slug: req.body[i].slug,
      //   desc: req.body[i].desc,
      //   img: req.body[i].img,
      //   category: req.body[i].category,
      //   size: req.body[i].size,
      //   color: req.body[i].color,
      //   price: req.body[i].price,
      //   availableQty: req.body[i].availableQty,
      // }
      );
      // await p.save();
    }

    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ error: "This method is not allowed" });
  }
  //   let products = await Product.find();
  //   res.status(200).json({ products });
};

// export default handler();
export default connectDb(handler);
