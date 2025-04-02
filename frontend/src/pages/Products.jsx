import React, { useState, useEffect, lazy, Suspense, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/Products.css";

// Lazy load ProductCard component
const ProductCard = lazy(() => import("../components/ProductCard"));

// API endpoint stored as a constant to avoid repetition
const API_BASE_URL = "http://localhost:5000/api/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [endReached, setEndReached] = useState(false);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const searchTerm = queryParams.get("search"); // Get search term from query

  // Items per page
  const ITEMS_PER_PAGE = 8;

  // Reset everything when category or search term changes
  useEffect(() => {
    setProducts([]);
    setPageNumber(1);
    setHasMore(true);
    setEndReached(false);
    setLoading(false);
    setInitialLoading(true);
    setError(null);
    
    if (observer.current) {
      observer.current.disconnect();
    }
  }, [category, searchTerm]);

  // Intersection observer setup
  const observer = useRef();
  
  const lastProductElementRef = useCallback(node => {
    if (loading || endReached || !hasMore) return;

    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading && !endReached) {
        console.log("End of list reached, loading more products...");
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    }, { threshold: 0.1, rootMargin: '100px' });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, endReached]);

  // Fetch products based on category or search term
  useEffect(() => {
    if (endReached) return;

    let isActive = true;
    const controller = new AbortController();
    
    const fetchProducts = async () => {
      if (pageNumber === 1) setInitialLoading(true);
      else setLoading(true);
      
      try {
        const params = new URLSearchParams();
        
        if (category) params.append("category", category);
        if (searchTerm) params.append("search", searchTerm); // Add search term to the request
        
        params.append("page", pageNumber.toString());
        params.append("limit", ITEMS_PER_PAGE.toString());
        
        const response = await fetch(`${API_BASE_URL}?${params.toString()}`, {
          signal: controller.signal
        });
        
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        
        const newProducts = await response.json();
        
        if (isActive) {
          const reachedEnd = newProducts.length === 0 || newProducts.length < ITEMS_PER_PAGE;
          
          if (reachedEnd) {
            setHasMore(false);
            setEndReached(true);
            if (observer.current) observer.current.disconnect();
          }
          
          setProducts(prevProducts => {
            console.log(`New products length: ${newProducts.length}`);
            console.log(`Has more: ${hasMore}`);
            if (newProducts.length === 0 || newProducts.length < ITEMS_PER_PAGE) {
              setHasMore(false);
              setEndReached(true);
            }
            return [...prevProducts, ...newProducts];
          });
        }
      } catch (err) {
        if (isActive && err.name !== 'AbortError') {
          console.error('Error fetching products:', err);
          setError('Failed to load products. Please try again.');
          setHasMore(false);
          setEndReached(true);
        }
      } finally {
        if (isActive) {
          setLoading(false);
          setInitialLoading(false);
        }
      }
    };
    
    fetchProducts();
    
    return () => {
      isActive = false;
      controller.abort();
      if (observer.current) observer.current.disconnect();
    };
  }, [category, searchTerm, pageNumber, endReached]);

  return (
    <div className="products-container">
      <h2>{category ? `Products in ${category}` : searchTerm ? `Search results for "${searchTerm}"` : "All Products"}</h2>
      
      {initialLoading && <p>Loading products...</p>}
      
      <div className="products-list">
        {products.length > 0 ? products.map((product, index) => (
          <div key={product.id} ref={products.length === index + 1 && !endReached ? lastProductElementRef : null} className="product-wrapper">
            <Suspense fallback={<div>Loading...</div>}>
              <ProductCard product={product} />
            </Suspense>
          </div>
        )) : <p>No products found.</p>}
      </div>
      
      {loading && !endReached && <p>Loading more products...</p>}
      
      {!loading && endReached && products.length > 0 && <p>All products loaded.</p>}
      
      {error && <p>{error}</p>}
    </div>
  );
};

export default Products;
