"use client";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Header: React.FC = () => {
  const cart = useSelector((state: RootState) => state?.cartReducer);
  const totalItems = cart?.items.reduce((acc, item) => acc + item?.quantity, 0);
  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cart?.totalPrice);

  return (
    <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link href="/">My E-commerce Store</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/cart" className="flex items-center">
          <span className="mr-2">Cart 🛒</span>
          <span className="bg-green-600 px-2 py-1 rounded">{totalItems}</span>
        </Link>
        <span>Total: {totalPrice}</span>
      </div>
    </header>
  );
};

export default Header;
