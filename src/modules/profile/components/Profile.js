import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Ankit Sharma',
    email: 'ankit.sharma@example.com',
    phone: '+91 98765 43210',
    dob: '15/08/1990',
    pan: 'ABCDE1234F',
    aadhaar: 'XXXX-XXXX-5678',
    bankAccount: 'XXXX-XXXX-1234 (HDFC Bank)',
    address: '123, Green Park, New Delhi - 110016'
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
          {isEditing ? (
            <div className="flex space-x-2">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              className="text-blue-600 font-medium hover:text-blue-800 transition"
              onClick={handleEditToggle}
            >
              Edit Profile
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{profileData.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{profileData.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{profileData.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="dob"
                    value={profileData.dob}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{profileData.dob}</p>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Financial Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">PAN Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="pan"
                    value={profileData.pan}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{profileData.pan}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Aadhaar Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="aadhaar"
                    value={profileData.aadhaar}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{profileData.aadhaar}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Bank Account</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="bankAccount"
                    value={profileData.bankAccount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{profileData.bankAccount}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Address</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{profileData.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 mb-4">KYC Status</h3>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-3">
              <i className="fas fa-check"></i>
            </div>
            <div>
              <p className="font-medium">Verified</p>
              <p className="text-sm text-gray-500">Completed on 12/03/2022</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Security Settings</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Password</h3>
              <p className="text-sm text-gray-500">Last changed 3 months ago</p>
            </div>
            <button className="text-blue-600 font-medium hover:text-blue-800 transition">
              Change Password
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <button className="text-blue-600 font-medium hover:text-blue-800 transition">
              Enable 2FA
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Linked Devices</h3>
              <p className="text-sm text-gray-500">2 active devices</p>
            </div>
            <button className="text-blue-600 font-medium hover:text-blue-800 transition">
              Manage Devices
            </button>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Documents</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mr-3">
                <i className="fas fa-id-card"></i>
              </div>
              <h3 className="font-medium">PAN Card</h3>
            </div>
            <p className="text-sm text-gray-500 mb-2">Uploaded on 10/02/2022</p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition">
              View Document
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-800 mr-3">
                <i className="fas fa-address-card"></i>
              </div>
              <h3 className="font-medium">Aadhaar Card</h3>
            </div>
            <p className="text-sm text-gray-500 mb-2">Uploaded on 12/02/2022</p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition">
              View Document
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-800 mr-3">
                <i className="fas fa-file-invoice"></i>
              </div>
              <h3 className="font-medium">Bank Statement</h3>
            </div>
            <p className="text-sm text-gray-500 mb-2">Uploaded on 15/02/2022</p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition">
              View Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;