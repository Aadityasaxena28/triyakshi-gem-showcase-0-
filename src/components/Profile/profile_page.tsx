import { Edit2, Gift, Lock, LogOut, Menu, Package, Save, ShoppingCart, User, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [userData, setUserData] = useState({
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    email: 'priya.sharma@email.com',
    address: '123 MG Road, Bangalore, Karnataka - 560001',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
  });
  
  const [editData, setEditData] = useState({...userData});
  
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [passwordSaved, setPasswordSaved] = useState(false);
  
  
  const [orders] = useState([
    { id: 'ORD001', date: '2024-09-15', items: 2, total: 35000, status: 'Delivered', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=150&h=150&fit=crop' },
    { id: 'ORD002', date: '2024-08-22', items: 1, total: 18000, status: 'Delivered', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=150&h=150&fit=crop' },
    { id: 'ORD003', date: '2024-07-10', items: 3, total: 52000, status: 'Delivered', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=150&h=150&fit=crop' }
  ]);
  
  
  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };
  
  const handleInputChange = (field, value) => {
    setEditData({...editData, [field]: value});
  };
  
  const navigate = useNavigate();
  const handleLogout = (): void => {
    localStorage.removeItem("tg_user");
    // setIsProfileOpen(false);
    navigate("/");
  };
  
  const handlePasswordSave = () => {
    if (passwordData.new && passwordData.new === passwordData.confirm) {
      setPasswordSaved(true);
      setPasswordData({ current: '', new: '', confirm: '' });
      setTimeout(() => setPasswordSaved(false), 3000);
    }
  };

  const renderProfile = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-yellow-600">My Profile</h2>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              <Edit2 size={18} />
              Edit Profile
            </button>
          ) : (
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              <Save size={18} />
              Save Changes
            </button>
          )}
        </div>
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400 mb-4">
            <img src={userData.image} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            {isEditing ? (
              <input 
                type="text"
                value={editData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              />
            ) : (
              <div className="px-4 py-3 bg-yellow-50 rounded-lg text-gray-800">{userData.name}</div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            {isEditing ? (
              <input 
                type="tel"
                value={editData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              />
            ) : (
              <div className="px-4 py-3 bg-yellow-50 rounded-lg text-gray-800">{userData.phone}</div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            {isEditing ? (
              <input 
                type="email"
                value={editData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              />
            ) : (
              <div className="px-4 py-3 bg-yellow-50 rounded-lg text-gray-800">{userData.email}</div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
            {isEditing ? (
              <textarea 
                value={editData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows="3"
                className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              />
            ) : (
              <div className="px-4 py-3 bg-yellow-50 rounded-lg text-gray-800">{userData.address}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // const renderCart = () => (
  //   <div className="max-w-4xl mx-auto">
  //     <div className="bg-white rounded-lg shadow-lg p-8">
  //       <h2 className="text-3xl font-bold text-yellow-600 mb-6">Shopping Cart</h2>
        
  //       {cartItems.length === 0 ? (
  //         <div className="text-center py-12 text-gray-500">Your cart is empty</div>
  //       ) : (
  //         <>
  //           <div className="space-y-4 mb-6">
  //             {cartItems.map(item => (
  //               <div key={item.id} className="flex items-center gap-4 p-4 border-2 border-yellow-200 rounded-lg">
  //                 <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
  //                 <div className="flex-1">
  //                   <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
  //                   <p className="text-yellow-600 font-semibold">₹{item.price.toLocaleString()}</p>
  //                   <div className="flex items-center gap-3 mt-2">
  //                     <button 
  //                       onClick={() => updateQuantity(item.id, -1)}
  //                       className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center hover:bg-yellow-600"
  //                     >
  //                       <Minus size={16} />
  //                     </button>
  //                     <span className="font-semibold text-gray-800 w-8 text-center">{item.quantity}</span>
  //                     <button 
  //                       onClick={() => updateQuantity(item.id, 1)}
  //                       className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center hover:bg-yellow-600"
  //                     >
  //                       <Plus size={16} />
  //                     </button>
  //                   </div>
  //                 </div>
  //                 <div className="text-right">
  //                   <p className="font-bold text-xl text-gray-800">₹{(item.price * item.quantity).toLocaleString()}</p>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
            
  //           <div className="border-t-2 border-yellow-300 pt-6">
  //             <div className="flex justify-between items-center mb-6">
  //               <span className="text-2xl font-bold text-gray-800">Total:</span>
  //               <span className="text-3xl font-bold text-yellow-600">₹{totalCart.toLocaleString()}</span>
  //             </div>
  //             <button className="w-full bg-yellow-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition">
  //               Buy Now
  //             </button>
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   </div>
  // );

  const renderOrders = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6">Order History</h2>
        
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="p-6 border-2 border-yellow-200 rounded-lg hover:border-yellow-400 transition">
              <div className="flex gap-4">
                <img src={order.image} alt={`Order ${order.id}`} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-xl text-gray-800">Order #{order.id}</h3>
                      <p className="text-gray-600">Date: {order.date}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Items: {order.items}</span>
                    <span className="text-xl font-bold text-yellow-600">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderComingSoon = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-16 text-center">
        <Gift size={80} className="mx-auto mb-6 text-yellow-500" />
        <h2 className="text-4xl font-bold text-yellow-600 mb-4">Coming Soon!</h2>
        <p className="text-xl text-gray-600">This feature will be available shortly. Stay tuned!</p>
      </div>
    </div>
  );
  
  const renderChangePassword = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-yellow-600 mb-6">Change Password</h2>
        
        {passwordSaved && (
          <div className="mb-6 p-4 bg-green-100 border-2 border-green-500 rounded-lg text-green-700 font-semibold text-center">
            Password Saved Successfully!
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
            <input 
              type="password"
              value={passwordData.current}
              onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
              className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              placeholder="Enter current password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
            <input 
              type="password"
              value={passwordData.new}
              onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
              className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              placeholder="Enter new password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
            <input 
              type="password"
              value={passwordData.confirm}
              onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
              className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 outline-none"
              placeholder="Confirm new password"
            />
          </div>
          
          <button 
            onClick={handlePasswordSave}
            className="w-full bg-yellow-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition"
          >
            Save New Password
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-yellow-100 rounded-lg transition"
          >
            <Menu size={28} className="text-yellow-600" />
          </button>
          <h1
            className="text-3xl sm:text-4xl font-extrabold 
            bg-gradient-to-r from-yellow-500 via-orange-400 to-rose-400 
                      bg-clip-text text-transparent tracking-wide drop-shadow-sm 
                      bg-[length:200%_auto] animate-[shimmer_6s_linear_infinite]"
          >
            Your Life, Your Fortune
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-yellow-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-yellow-600">Menu</h2>
          <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-yellow-100 rounded-lg">
            <X size={24} className="text-yellow-600" />
          </button>
        </div>
        
        <nav className="p-4">
          <button 
            onClick={() => { setCurrentPage('profile'); setSidebarOpen(false); }}
            className="w-full flex items-center gap-4 p-4 hover:bg-yellow-100 rounded-lg transition mb-2"
          >
            <User size={24} className="text-yellow-600" />
            <span className="font-semibold text-gray-800">Back to Profile</span>
          </button>
          
          <button 
            onClick={() => { setCurrentPage('cart'); setSidebarOpen(false); }}
            className="w-full flex items-center gap-4 p-4 hover:bg-yellow-100 rounded-lg transition mb-2"
          >
            <ShoppingCart size={24} className="text-yellow-600" />
            <span className="font-semibold text-gray-800">Cart</span>
          </button>
          
          <button 
            onClick={() => { setCurrentPage('orders'); setSidebarOpen(false); }}
            className="w-full flex items-center gap-4 p-4 hover:bg-yellow-100 rounded-lg transition mb-2"
          >
            <Package size={24} className="text-yellow-600" />
            <span className="font-semibold text-gray-800">Order History</span>
          </button>
          
          <button 
            onClick={() => { setCurrentPage('refer'); setSidebarOpen(false); }}
            className="w-full flex items-center gap-4 p-4 hover:bg-yellow-100 rounded-lg transition mb-2"
          >
            <Gift size={24} className="text-yellow-600" />
            <span className="font-semibold text-gray-800">Refer & Earn</span>
          </button>
          
          <button 
            onClick={() => { setCurrentPage('password'); setSidebarOpen(false); }}
            className="w-full flex items-center gap-4 p-4 hover:bg-yellow-100 rounded-lg transition mb-2"
          >
            <Lock size={24} className="text-yellow-600" />
            <span className="font-semibold text-gray-800">Change Password</span>
          </button>
          
          <button 
            className="w-full flex items-center gap-4 p-4 hover:bg-red-100 rounded-lg transition mt-8"
            onClick={handleLogout}
          >
            <LogOut size={24} className="text-red-600" />
            <span className="font-semibold text-red-600">Log Out</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'profile' && renderProfile()}
        {currentPage === 'cart' && <Cart cartItems updateQuantity/>}
        {currentPage === 'orders' && renderOrders()}
        {currentPage === 'refer' && renderComingSoon()}
        {currentPage === 'password' && renderChangePassword()}
      </main>
    </div>
  );
}