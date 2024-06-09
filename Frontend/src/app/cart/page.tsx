"use client";

import React from "react";
import OrderRow from "@/Components/OrderRow";
import getitemfromcart from "@/libs/user/getitemfromcart";
import Loading from "@/Components/Loading";
import getProductbyID from "@/libs/product/getProductbyID";
import { useUserAuth } from "@/libs/context/UserAuthContext";

interface CartItem {
  product_id: string;
  quantity: number;
  total_price: number;
}

interface Order {
  name: string;
  price: number;
  quantities: number;
  total_price: number;
}

const Page: React.FC = () => {
  const { user } = useUserAuth();
  const [orderData, setOrderData] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [totalCartPrice, setTotalCartPrice] = React.useState<number>(0);

  const fetchOrder = React.useCallback(async () => {
    if (!user) return;
    setLoading(true);

    try {
      const response = await getitemfromcart(user.uid);
      const cart_data = response.data.cart_data;
      let totalCartPrice = 0;

      const orders = await Promise.all(
        cart_data.map(async (item: CartItem) => {
          const product = await getProductbyID(item.product_id);
          //   console.log(item.total_price);
          totalCartPrice += item.total_price;
          return {
            name: product.data.product_name,
            price: product.data.price,
            quantities: item.quantity,
            total_price: item.total_price,
          };
        })
      );

      setOrderData(orders);
      setTotalCartPrice(totalCartPrice);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  }, [user]);

  React.useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold justify-center text-center mx-auto mt-6 mb-10">
        My Cart
      </h1>
      <div className="container items-center justify-center mx-auto w-[80vw] border-2 rounded-3xl p-5">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Item No.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantities</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5}>
                    <Loading />
                  </td>
                </tr>
              ) : (
                orderData.map((order, index) => (
                  <OrderRow
                    key={index}
                    index={index}
                    name={order.name}
                    price={order.price}
                    quantities={order.quantities}
                    totalprice={order.total_price}
                  />
                ))
              )}
            </tbody>
          </table>
          <div className="flex flex-col justify-end items-center mt-6">
            <p className="text-sm md:text-lg font-bold mb-2">
              Total price: ${totalCartPrice.toFixed(2)}
            </p>
            <button className="btn md:btn-xl">Check out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
