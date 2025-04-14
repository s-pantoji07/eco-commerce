import { useState } from "react";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  User,
  Info ,
  ShoppingCart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to products page with search query
    navigate(`/products?search=${searchTerm}`);
  };

  const handleCategoryClick = (categoryName) => {
    // Close the menu
    setMenuOpen(false);
    // Navigate to products page with the category parameter
    navigate(`/products?category=${categoryName}`);
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Left Section: Hamburger (Mobile) + Logo + Categories + Search */}
      <div className="flex items-center flex-grow space-x-4">
        {/* Hamburger Menu Button (Mobile) */}
        <button onClick={() => setMenuOpen(true)} className="lg p-2">
          <Menu size={24} />
        </button>

        {/* Logo */}
        <h1 className="text-2xl font-bold text-black flex items-center">
          <span className="text-green-600">🌱</span> Organio
        </h1>

        {/* Categories Dropdown (Hidden in Mobile) */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-full"
          >
            <span>All Categories</span>
            <ChevronDown size={16} />
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 bg-white text-black shadow-lg rounded-lg w-40">
              <ul className="p-2">
              <a 
                href="#" 
                className="block w-full h-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick("Fruits and Vegetables");
                }}
              >
                Fruits and Vegetables
              </a>
               
              <a 
                href="#" 
                className="block w-full h-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick("Dairy and Eggs");
                }}
              >
                Dairy 
              </a>
              </ul>
            </div>
          )}
        </div>

        {/* Search Bar */}
        {/* Search Bar */}
        <div className="flex flex-grow items-center bg-gray-100 rounded-full px-5 py-2 max-w-md">
        <form onSubmit={handleSearchSubmit} className="flex w-full flex-row items-center">
  <Search className="text-gray-500 self-center" size={25} />
  <input
    type="text"
    placeholder="Search for more than 20,000 products..."
    value={searchTerm}
    onChange={handleSearchChange}
    className="w-full px-2 text-gray-800 bg-transparent outline-none border-none"
  />
  {searchTerm && (
    <button
      type="button"
      onClick={() => handleSearchChange({ target: { value: "" } })}
      className="ml-2 text-gray-500 self-center"
    >
      &#10005;
    </button>
  )}
</form>

        </div>
      </div>

      {/* Right Section: Navigation + Icons */}
      <div className="hidden lg:flex items-center space-x-6 text-black">
        <button
          onClick={() => navigate("/")}
          className="font-semibold hover:text-green-600"
        >
          Home
        </button>
        <div className="relative">
          <button
            onClick={() => navigate("/myorders")}
            className="font-semibold hover:text-green-600"
          >
            My Orders
          </button>
        </div>

        {/* Icons */}
        <User
          size={22}
          className="hover:text-green-600 cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <Info 
         size={22} 
         className="hover:text-green-600 cursor-pointer" 
         onClick={() => navigate("/about")}
        />
        <ShoppingCart
          size={22}
          className="hover:text-green-600 cursor-pointer"
          onClick={() => navigate("/cart")}
        />
      </div>

      {/* Mobile Sidebar Menu (Slide from Left) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        {/* Close Button */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold text-green-700">Our Menu</h2>
          <button onClick={() => setMenuOpen(false)}>
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="absolute z-10 w-64 p-4 space-y-4 text-gray-700 bg-white shadow-lg rounded-md">
            <li className="hover:bg-gray-100 p-2 cursor-pointer">
              <a 
                href="#" 
                className="block w-full h-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick("Fruits and Vegetables");
                }}
              >
                Fruits and Vegetables
              </a>
            </li>
            <li className="hover:bg-gray-100 p-2 cursor-pointer">
              <a 
                href="#" 
                className="block w-full h-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick("Dairy and Eggs");
                }}
              >
                Dairy and Eggs
              </a>
            </li>
            <li className="hover:bg-gray-100 p-2 cursor-pointer">
              <a 
                href="#" 
                className="block w-full h-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick("Meat and Poultry");
                }}
              >
                Meat and Poultry
              </a>
            </li>
            <li className="hover:bg-gray-100 p-2 cursor-pointer">
              <a 
                href="#" 
                className="block w-full h-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick("Seafood");
                }}
              >
                Seafood
              </a>
            </li>
            <li className="hover:bg-gray-100 p-2 cursor-pointer">
              <a 
                href="#" 
                className="block w-full h-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick("Bakery and Bread");
                }}
              >
                Bakery and Bread
              </a>
            </li>
            <li className="hover:bg-gray-100 p-2 cursor-pointer">
              <a 
                href="#" 
                className="block w-full h-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick("Canned Goods");
                }}
              >
                Canned Goods
              </a>
            </li>
            <li className="hover:bg-gray-100 p-2 cursor-pointer">
              <a 
                href="#" 
                className="block w-full h-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick("Frozen Foods");
                }}
              >
                Frozen Foods
              </a>
            </li>
            <li className="hover:bg-gray-100 p-2 cursor-pointer">
              <a 
                href="#" 
                className="block w-full h-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick("Pasta and Rice");
                }}
              >
                Pasta and Rice
              </a>
            </li>
            <li className="hover:bg-gray-100 p-2 cursor-pointer">
              <a 
                href="#" 
                className="block w-full h-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick("Breakfast Foods");
                }}
              >
                Breakfast Foods
              </a>
            </li>
          </ul>
      </div>

      {/* Background Overlay when menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}
