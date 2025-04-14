import React, { useState } from 'react';
import { User, Mail, Phone, Edit, Leaf, ShoppingBag, Clock, Map } from 'lucide-react';

const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: 'Sarvesh',
    lastName: 'Pantoji',
    email: 'pantojisarvesh@gmail.com',
    mobileNumber: '',
    username: 'spantoji',
    deliveryPreference: 'eco-friendly',
    packagingOption: 'minimal',
    carbonOffsetEnabled: true,
    savedAddresses: [
      { id: 1, name: 'Home', isDefault: true }
    ]
  });

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header with eco indicator */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-medium text-gray-800">{user.firstName} {user.lastName}</h2>
                <p className="text-sm text-gray-500">{user.username}</p>
              </div>
            </div>
            
            <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
              <Leaf size={16} className="text-green-600 mr-1" />
              <span className="text-xs font-medium text-green-600">Eco Member</span>
            </div>
          </div>
          
          {/* Main content */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal information */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail size={20} className="text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone size={20} className="text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Mobile Number</p>
                      <p className="text-gray-800">{user.mobileNumber || 'Not Provided'}</p>
                    </div>
                  </div>
                </div>
                
                <button className="inline-flex items-center text-sm text-green-600 hover:text-green-700">
                  <Edit size={16} className="mr-1" />
                  Edit Profile
                </button>
              </div>
              
              {/* Sustainability preferences */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Sustainability Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Leaf size={20} className="text-green-600 mr-3" />
                      <span className="text-gray-700">Eco-friendly Delivery</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="eco-delivery" 
                        checked={user.deliveryPreference === 'eco-friendly'}
                        onChange={() => {
                          setUser({
                            ...user, 
                            deliveryPreference: user.deliveryPreference === 'eco-friendly' ? 'standard' : 'eco-friendly'
                          });
                        }}
                      />
                      <label htmlFor="eco-delivery" className={`block w-11 h-6 rounded-full ${user.deliveryPreference === 'eco-friendly' ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-200`}>
                        <span className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full transform transition-transform duration-200 ${user.deliveryPreference === 'eco-friendly' ? 'translate-x-5' : ''}`}></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <ShoppingBag size={20} className="text-green-600 mr-3" />
                      <span className="text-gray-700">Minimal Packaging</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="minimal-packaging" 
                        checked={user.packagingOption === 'minimal'}
                        onChange={() => {
                          setUser({
                            ...user, 
                            packagingOption: user.packagingOption === 'minimal' ? 'standard' : 'minimal'
                          });
                        }}
                      />
                      <label htmlFor="minimal-packaging" className={`block w-11 h-6 rounded-full ${user.packagingOption === 'minimal' ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-200`}>
                        <span className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full transform transition-transform duration-200 ${user.packagingOption === 'minimal' ? 'translate-x-5' : ''}`}></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Clock size={20} className="text-green-600 mr-3" />
                      <span className="text-gray-700">Carbon Offset</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="carbon-offset" 
                        checked={user.carbonOffsetEnabled}
                        onChange={() => {
                          setUser({
                            ...user, 
                            carbonOffsetEnabled: !user.carbonOffsetEnabled
                          });
                        }}
                      />
                      <label htmlFor="carbon-offset" className={`block w-11 h-6 rounded-full ${user.carbonOffsetEnabled ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-200`}>
                        <span className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full transform transition-transform duration-200 ${user.carbonOffsetEnabled ? 'translate-x-5' : ''}`}></span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <Map size={20} className="text-green-600 mr-2 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Saved Addresses</p>
                      <p className="text-xs text-gray-500 mt-1">You have {user.savedAddresses.length} saved delivery address</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer with eco impact */}
          <div className="bg-green-50 p-4 mt-6">
            <div className="flex items-center justify-center">
              <Leaf size={16} className="text-green-600 mr-2" />
              <p className="text-sm text-gray-600">Your eco-friendly choices have saved approximately 2.4kg of CO₂ this month.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;