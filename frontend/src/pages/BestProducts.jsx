import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard"; // Import the ProductCard component
import "../Styles/BestProducts.css"; // Optional styling
const API_URL = `${import.meta.env.VITE_API_URL}/api`|| "http://localhost:5000/api/auth";

const BestProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const response = await fetch("http://127.0.0.1:5000/api/products"); 
                const response = await fetch(`${API_URL}/products`); 
                const data = await response.json();

                // Shuffle the array and pick 10 random products
                const shuffled = data.sort(() => 0.5 - Math.random());
                setProducts(shuffled.slice(0, 10));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="best-products">
            <h2>🔥 Best Products</h2>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => <ProductCard key={product._id} product={product} />)
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
        </div>
    );
};

export default BestProducts;
