"use client";
import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Link from "next/link";
import { removeFromCart } from "@/store/cartSlice";

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.items.length === 0 ? (
          <div>
            <p>Your cart is empty. </p>
            <Link href="/" className="underline">
              Go back to store
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cart?.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-4 rounded"
              >
                <div className="flex items-center justify-between">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded mr-2"
                  />
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>
                      Price per unit:{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.price)}
                    </p>
                  </div>
                </div>
                <div className="font-bold flex justify-center items-center">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.price * item.quantity)}
                  <button
                    className="ml-4 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="border-t pt-4 text-right font-bold">
              Total:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(cart.totalPrice)}
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
