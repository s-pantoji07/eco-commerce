import React from "react";
import { Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Don't forget this
import "../Styles/Footer.css";

const Footer = () => {
  const navigate = useNavigate(); // ✅ Moved here

  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center">
              <Leaf className="h-6 w-6 text-green-400 mr-2" />
              <span className="text-xl font-bold text-white">Organio</span>
            </div>
            <p className="mt-2 text-sm text-white">
              Organic food for a healthy planet.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li><button
                    onClick={() => navigate("/")}
                    className="font-semibold hover:text-green-600"
                  >
                    Fresh Produce
                  </button></li>
                <li><button
                    onClick={() => navigate("/")}
                    className="font-semibold hover:text-green-600"
                  >
                    Pantry Staples
                  </button></li>
                <li><button
                    onClick={() => navigate("/")}
                    className="font-semibold hover:text-green-600"
                  >
                    Dairy & Alternatives
                  </button></li>
                <li><button
                    onClick={() => navigate("/")}
                    className="font-semibold hover:text-green-600"
                  >
                    Seasonal Specials
                  </button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => navigate("/about")}
                    className="font-semibold hover:text-green-600"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/about")}
                    className="font-semibold hover:text-green-600"
                  >
                    Our Farmers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/about")}
                    className="font-semibold hover:text-green-600"
                  >
                    Sustainability
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/about")}
                    className="font-semibold hover:text-green-600"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li><button
                    onClick={() => navigate("/about")}
                    className="font-semibold hover:text-green-600"
                  >
                    help@organio.com
                  </button></li>
                <li><button
                    onClick={() => navigate("/about")}
                    className="font-semibold hover:text-green-600"
                  >
                   +1 (555) 123-4567
                  </button></li>
                <li>123 Green Street, Cityville</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-sm text-center ">
          <p className="text-white">
            &copy; {new Date().getFullYear()} Organio. All rights reserved.
          </p>
          <p className="mt-2 text-white">
            Our website is built with green software principles to minimize
            environmental impact.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
