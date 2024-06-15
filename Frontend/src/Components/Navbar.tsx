"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/libs/context/UserAuthContext";
import checkCookies from "@/libs/user/checkCookies";
import getitemfromcart from "@/libs/user/getitemfromcart";
import getUserbyID from "@/libs/user/getUserbyID";

const Navbar = () => {
  const router = useRouter();
  const { user } = useUserAuth();
  const [cartItems, setCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = React.useState<number>(0);
  const [userData, setUserData] = React.useState<any>({});
  const [hasImage, setHasImage] = React.useState<boolean>(false);

  const fetchCartItems = useCallback(async () => {
    try {
      if (!user) return; // Check if user exists
      const response = await getitemfromcart(user.uid);
      const cartItemCount = response.data.cart_data.length;
      const totalCartPrice = response.data.total;
      setCartItems(cartItemCount);
      setTotalCartPrice(totalCartPrice);
      const fetchData = await getUserbyID(user.uid);
      setUserData(fetchData.data);
      if (fetchData.data.image != "") {
        setHasImage(true);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems, user]);

  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartItems();
    };
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [fetchCartItems]);

  const { logOut } = useUserAuth();
  // checkCookies();
  const [isToken, setIsToken] = React.useState(false);

  useEffect(() => {
    setIsToken(checkCookies());
  });

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/website/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="navbar bg-base-100 gap-4">
        <div className="flex">
          <button
            onClick={() => router.push("/")}
            className="btn btn-ghost text-xl"
          >
            E-Commerce
          </button>
        </div>
        <div className="flex flex-row justify-start mr-auto gap-4">
          <button
            className="btn btn-ghost p-2"
            onClick={() => router.push("/website/home")}
          >
            Home
          </button>
          <button
            className="btn btn-ghost p-2"
            onClick={() => router.push("/website/products")}
          >
            Products
          </button>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">{cartItems} Items</span>
                <span className="text-info">Total: ${totalCartPrice}</span>
                <div className="card-actions">
                  <button
                    onClick={() => router.push("/website/cart")}
                    className="btn btn-primary btn-block"
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {hasImage ? (
                  <img src={userData.image} />
                ) : (
                  <img src="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611737.jpg?t=st=1717690136~exp=1717693736~hmac=d1b28deddab281a32ed845e29e0b68148cee4cb621e7ba53f726e04d98549581&w=826" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {isToken ? (
                <>
                  <li>
                    <a href="/website/profile" className="justify-between">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a onClick={() => router.push("/website/login")}>Sign in</a>
                  </li>
                  <li>
                    <a onClick={() => router.push("/website/register")}>
                      Register
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
