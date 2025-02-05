"use client";
import React, { useState } from "react";
import { Product } from "@/types";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      }),
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.price);

  return (
    <div className="border rounded p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-cover mb-4 rounded"
      />
      <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2">
        {truncateText(product.description, 100)}
      </p>
      <div className="mb-2 font-bold">{formattedPrice}</div>
      <div className="mb-4">Rating: {product.rating}</div>
      <button
        onClick={handleAddToCart}
        className="mt-auto px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        disabled={added}
      >
        {added ? "Added!" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
