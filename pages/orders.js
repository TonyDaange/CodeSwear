import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch("/api/myorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });
      let res = await a.json();
      setOrders(res.orders);
      // console.log(res);
    };
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      fetchOrders();
    }
  }, []);
  return (
    <div className="lg:mt-35 xl:mt-25 mt-42 mx-auto container">
      <h1 className="text-4xl font-extrabold text-center mt-[110px]">
        My Orders
      </h1>
      <div className="flex flex-col ">
        <div className="overflow-x-auto">
          <div className="py-2 inline-block min-w-full">
            <div className="overflow-hidden">
              <table className="min-w-full text-3xl mt-10">
                <thead className="border-b bg-white">
                  <tr className="space-x-10">
                    <th
                      scope="col"
                      className="text-gray-900 px-4 py-2 text-start"
                    >
                      #Order id
                    </th>
                    <th
                      scope="col"
                      className="text-gray-900 px-4 py-2 text-start"
                    >
                      Eamil
                    </th>
                    <th
                      scope="col"
                      className="text-gray-900 px-4 py-2 text-center"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="text-gray-900 px-4 py-2 text-center"
                    >
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center text-2xl">
                  {orders.map((item) => {
                    return (
                      <tr
                        key={item._id}
                        className="border-b bg-white hover:bg-gray-100 py-9"
                      >
                        <td className="px-4 py-4 text-start">{item.orderId}</td>
                        <td className="px-4 py-4 text-start">{item.email}</td>
                        <td className="px-4 py-4">₹{item.amount}</td>
                        <td className="px-4 py-4">
                          <Link href={"/order?id=" + item._id}>Details</Link>
                        </td>
                      </tr>
                    );
                  })}
                  {/* <tr className="border-b bg-white hover:bg-gray-100 py-9">
                    <td className="px-4 py-4">2</td>
                    <td className="px-4 py-4">
                      Wear The Code Mug with Spoon (Dark Blue)
                    </td>
                    <td className="px-4 py-4">₹599</td>
                    <td className="px-4 py-4">1</td>
                  </tr>
                  <tr className="border-b bg-white hover:bg-gray-100 py-9">
                    <td className="px-4 py-4">3</td>

                    <td className="px-4 py-4">
                      Wear The Code Sticker Pack Square (Super Hero)
                    </td>
                    <td className="px-4 py-4">₹99</td>
                    <td className="px-4 py-4">1</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI);
//   }
//   // let orders = await Order.find({ user: user.id });
//   let orders = await Order.find({});

//   return {
//     // props: { orders: JSON.parse(JSON.stringify(orders)) }, // will be passed to the page component as props
//     props: { orders: orders }, // will be passed to the page component as props
//   };
// }

export default Orders;
