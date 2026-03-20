const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      // ref: 'User',
      required: true,
    },

    orderId: {
      type: String,
      required: true,
    },

    paymentInfo: {
      type: String,
      default: "",
    },

    transactionId: {
      type: String,
      default: "",
    },

    products: {
      type: Object,
      required: true,
    },

    // products: [
    //   {
    //     productId: {
    //       type: String,
    //       ref: 'Product',
    //       required: true,
    //     },
    //     product: {
    //        type: mongoose.Schema.Types.ObjectId,
    //        ref: 'Product',
    //        required: true
    //     },
    //     quantity: {
    //       type: Number,
    //       required: true,
    //       min: 1,
    //     },
    //   },
    // ],
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
      default: "Pending",
      required: true,
    },
    deliveryStatus: {
      type: String,
      default: "unshipped",
      required: true,
    },
  },
  { timestamps: true },
);
mongoose.models = {};
export default mongoose.model("Order", OrderSchema);
