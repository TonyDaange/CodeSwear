import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  let products = await Product.find();
  let tshirts = {};
  for (let item of products) {
    if (item.name in tshirts) {
      if (
        !tshirts[item.name].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.name].color.push(item.color);
      }
      if (
        !tshirts[item.name].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.name].size.push(item.size);
      }
    } else {
      tshirts[item.name] = JSON.parse(JSON.stringify(item));
      tshirts[item.name].color = item.availableQty > 0 ? [item.color] : [];
      tshirts[item.name].size = item.availableQty > 0 ? [item.size] : [];
    }
  }
  res.status(200).json({ tshirts, products });
  // res.status(200).json({ products });
};

// export default handler();
export default connectDb(handler);
