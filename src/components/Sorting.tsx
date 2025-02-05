"use client";
import React from "react";

interface SortingProps {
  sortBy: "price" | "rating" | "";
  onChange: (value: "price" | "rating" | "") => void;
}

const Sorting: React.FC<SortingProps> = ({ sortBy, onChange }) => {
  return (
    <select
      value={sortBy}
      onChange={(e) => onChange(e.target.value as "price" | "rating" | "")}
      className="border rounded px-4 py-2 text-neutral-900"
    >
      <option value="">Default</option>
      <option value="price">Price</option>
      <option value="rating">Rating</option>
    </select>
  );
};

export default Sorting;
