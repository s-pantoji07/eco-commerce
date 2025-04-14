import React from 'react';
import { Leaf, Globe, Apple, ShoppingBag, Truck, Users, Salad, Heart } from 'lucide-react';
import "../Styles/AboutUs.css";
export default function AboutUs() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-gray-50 pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Organio</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bringing nature's goodness to your table with sustainably sourced organic foods and eco-friendly practices.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-green-500">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              At Organio, we're passionate about bringing the purest organic foods to your home while minimizing our environmental footprint. We believe that healthy eating should nurture both people and planet. From farm to table, we're committed to sustainable practices that support local farmers, reduce waste, and protect our ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="bg-green-100 rounded-lg p-6 h-64 flex items-center justify-center">
                <Salad className="h-24 w-24 text-green-600" />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Organio was founded in 2018 by a group of health-conscious individuals who were frustrated with the lack of truly organic options in the market. What began as a small farm-to-door delivery service has grown into a comprehensive organic food marketplace.
              </p>
              <p className="text-gray-600">
                Today, we work with over 100 certified organic farmers and producers across the country, bringing you the freshest seasonal produce, pantry essentials, and specialty items—all while maintaining our commitment to sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Green Principles Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Green Principles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-400 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Apple className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">100% Organic</h3>
              </div>
              <p className="text-gray-600">We rigorously verify that all our products meet the highest organic certification standards, free from synthetic pesticides and GMOs.</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-400 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <ShoppingBag className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Sustainable Packaging</h3>
              </div>
              <p className="text-gray-600">Our packaging is either compostable, recyclable, or reusable, minimizing waste and environmental impact.</p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-400 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Truck className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Carbon-Neutral Delivery</h3>
              </div>
              <p className="text-gray-600">We offset the carbon footprint of our deliveries and optimize routes to reduce emissions.</p>
            </div>
            
            {/* Card 4 */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-400 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Fair Trade Practices</h3>
              </div>
              <p className="text-gray-600">We ensure our farmers and producers receive fair compensation for their work and sustainable farming practices.</p>
            </div>
            
            {/* Card 5 */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-400 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Community Support</h3>
              </div>
              <p className="text-gray-600">We donate a portion of our profits to local food banks and environmental initiatives in the communities we serve.</p>
            </div>
            
            {/* Card 6 */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-400 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Green Website</h3>
              </div>
              <p className="text-gray-600">Our website is built using green software principles, reducing energy consumption and carbon emissions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What We Offer</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product Category 1 */}
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">🥦</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fresh Produce</h3>
              <p className="text-gray-600 text-sm">Seasonal fruits and vegetables from certified organic farms.</p>
            </div>
            
            {/* Product Category 2 */}
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">🌾</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Grains & Legumes</h3>
              <p className="text-gray-600 text-sm">Whole grains, beans, and pulses from sustainable sources.</p>
            </div>
            
            {/* Product Category 3 */}
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">🍯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Pantry Staples</h3>
              <p className="text-gray-600 text-sm">Oils, sweeteners, spices, and other cooking essentials.</p>
            </div>
            
            {/* Product Category 4 */}
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">🥛</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Dairy & Alternatives</h3>
              <p className="text-gray-600 text-sm">Organic dairy products and plant-based alternatives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Impact Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Environmental Impact</h2>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-green-600 mb-2">10k+</p>
                <p className="text-gray-600">Trees Planted Through Our Buy-One-Plant-One Program</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-green-600 mb-2">85%</p>
                <p className="text-gray-600">Reduction in Plastic Packaging Since 2020</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-green-600 mb-2">100%</p>
                <p className="text-gray-600">Carbon-Offset Deliveries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">S</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Sarah M.</h3>
                  <p className="text-gray-500 text-sm">Loyal Customer since 2020</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"Organio has transformed how my family eats. The quality and freshness of their produce is unmatched, and I love knowing that my purchases support sustainable farming."</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">J</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">James T.</h3>
                  <p className="text-gray-500 text-sm">Loyal Customer since 2021</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"I appreciate that Organio goes beyond just selling food. Their commitment to environmental sustainability is evident in everything from their packaging to their website."</p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">L</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Lisa K.</h3>
                  <p className="text-gray-500 text-sm">Loyal Customer since 2019</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"As someone with dietary restrictions, finding quality organic ingredients was always a challenge until I discovered Organio. Their selection is incredible, and their customer service is top-notch."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Organic Movement</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for organic recipes, sustainability tips, and exclusive offers.
            </p>
            <div className="flex max-w-md mx-auto">
              <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-l-lg text-gray-800" />
              <button className="bg-gray-800 text-white px-6 py-3 rounded-r-lg font-medium hover:bg-gray-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}