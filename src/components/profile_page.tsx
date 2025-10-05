import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, ShoppingCart, X, Minus, Plus } from 'lucide-react';

export default function UserProfilePage() {
  const [cartOpen, setCartOpen] = useState(false);
  
  // Sample user data
  const userData = {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    image: null, // Set to null to show placeholder
    address: {
      street: '123, MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    }
  };

  // Sample cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Red Coral',
      quantity: 2,
      price: 12500,
      image: null
    },
    {
      id: 2,
      name: 'Ceylon Yellow Sapphire',
      quantity: 1,
      price: 42000,
      image: null
    },
    {
      id: 3,
      name: 'Natural Pearl',
      quantity: 1,
      price: 8500,
      image: null
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-6 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Image */}
                <div className="relative">
                  {userData.image ? (
                    <img
                      src={userData.image}
                      alt={userData.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center border-4 border-yellow-400">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{userData.name}</h2>
                  <p className="text-yellow-600 font-semibold mb-4">Premium Member</p>
                  <button className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Mail className="w-6 h-6 text-yellow-600" />
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Mail className="w-5 h-5 text-yellow-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Email Address</p>
                    <p className="text-lg text-gray-900 font-semibold">{userData.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Phone className="w-5 h-5 text-yellow-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Phone Number</p>
                    <p className="text-lg text-gray-900 font-semibold">{userData.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-yellow-600" />
                Residential Address
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-gray-900 font-semibold text-lg mb-2">{userData.address.street}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">City</p>
                      <p className="text-base text-gray-900 font-semibold">{userData.address.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">State</p>
                      <p className="text-base text-gray-900 font-semibold">{userData.address.state}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Pin Code</p>
                      <p className="text-base text-gray-900 font-semibold">{userData.address.pincode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl shadow-lg p-6 text-white">
                <p className="text-sm font-medium opacity-90 mb-1">Total Orders</p>
                <p className="text-4xl font-bold">24</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-yellow-400">
                <p className="text-sm font-medium text-gray-600 mb-1">In Cart</p>
                <p className="text-4xl font-bold text-yellow-600">{getTotalItems()}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-yellow-400">
                <p className="text-sm font-medium text-gray-600 mb-1">Wishlist</p>
                <p className="text-4xl font-bold text-yellow-600">8</p>
              </div>
            </div>
          </div>

          {/* Cart Sidebar - Desktop */}
          <div className="hidden lg:block space-y-6">
            {/* Change Password Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Security</h3>
              <button className="w-full bg-white hover:bg-yellow-50 text-gray-900 font-semibold py-3 px-4 rounded-lg border-2 border-yellow-400 hover:border-yellow-500 transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Change Password
              </button>
            </div>

            {/* Cart Items Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-yellow-600" />
                Cart Items
              </h3>

              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-yellow-400 transition-colors">
                        <div className="flex gap-3">
                          <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.name}</h4>
                            <p className="text-yellow-600 font-bold text-sm">₹{item.price.toLocaleString()}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="ml-auto text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-yellow-600">₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition-all">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Sidebar */}
      {cartOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setCartOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6 text-yellow-600" />
                  Cart Items
                </h3>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-yellow-400 transition-colors">
                        <div className="flex gap-3">
                          <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.name}</h4>
                            <p className="text-yellow-600 font-bold text-sm">₹{item.price.toLocaleString()}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="ml-auto text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-yellow-600">₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition-all">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}