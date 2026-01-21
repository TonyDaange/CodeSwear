const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: string,
      // ref: 'User',
      required: true,
    },
    products: [
      {
        productId: {
          type: string,
          // ref: 'Product',
          required: true,
        },
        // product: {
        //    type: mongoose.Schema.Types.ObjectId,
        //    ref: 'Product',
        //    required: true
        // },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    // orderDate: {
    //    type: Date,
    //    default: Date.now
    // },
    address: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      // enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("Order", OrderSchema);
