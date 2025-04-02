import React from "react";
import ProductCard from "../components/ProductCard";

const products = [
  {
    image: "https://via.placeholder.com/150",
    name: "Whole Wheat Sandwich Bread",
    rating: 5,
    reviews: 222,
    originalPrice: 24.0,
    discountedPrice: 18.0,
    discount: "10% OFF"
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Whole Grain Oatmeal",
    rating: 4,
    reviews: 41,
    originalPrice: 54.0,
    discountedPrice: 50.0,
    discount: "10% OFF"
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Sharp Cheddar Cheese Block",
    rating: 4.5,
    reviews: 32,
    originalPrice: 14.0,
    discountedPrice: 12.0,
    discount: "10% OFF"
  }
];

function Bsp() {
  return (
    <section style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Best Selling Products</h2>
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Bsp;
