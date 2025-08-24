import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchProfile,
  updateProfile,
  fetchDocuments,
  uploadDocument,
  fetchKycStatus,
  clearProfileError
} from '../store/profileActions';

const Profile = ({
  profile,
  documents,
  kycStatus,
  loading,
  updating,
  uploading,
  error,
  success,
  fetchProfile,
  updateProfile,
  fetchDocuments,
  uploadDocument,
  fetchKycStatus,
  clearProfileError
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    bank_name: '',
    bank_ifsc: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('');

  useEffect(() => {
    fetchProfile();
    fetchDocuments();
    fetchKycStatus();
  }, [fetchProfile, fetchDocuments, fetchKycStatus]);

  useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.personal_info?.name || '',
        email: profile.personal_info?.email || '',
        phone_number: profile.personal_info?.phone_number || '',
        date_of_birth: profile.personal_info?.date_of_birth || '',
        address: profile.address_info?.address || '',
        city: profile.address_info?.city || '',
        state: profile.address_info?.state || '',
        pincode: profile.address_info?.pincode || '',
        bank_name: profile.financial_info?.bank_name || '',
        bank_ifsc: profile.financial_info?.bank_ifsc || ''
      });
    }
  }, [profile]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset form when canceling edit
      setProfileData({
        name: profile.personal_info?.name || '',
        email: profile.personal_info?.email || '',
        phone_number: profile.personal_info?.phone_number || '',
        date_of_birth: profile.personal_info?.date_of_birth || '',
        address: profile.address_info?.address || '',
        city: profile.address_info?.city || '',
        state: profile.address_info?.state || '',
        pincode: profile.address_info?.pincode || '',
        bank_name: profile.financial_info?.bank_name || '',
        bank_ifsc: profile.financial_info?.bank_ifsc || ''
      });
    }
    clearProfileError();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const result = await updateProfile(profileData);
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleDocumentUpload = async () => {
    if (!selectedFile || !documentType) {
      alert('Please select a file and document type');
      return;
    }

    const result = await uploadDocument({
      document_type: documentType,
      file: selectedFile
    });

    if (result.success) {
      setSelectedFile(null);
      setDocumentType('');
      // Clear file input
      document.getElementById('document-file').value = '';
    }
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'aadhaar': return 'fas fa-address-card text-green-600';
      case 'pan': return 'fas fa-id-card text-blue-600';
      case 'bank_passbook': return 'fas fa-file-invoice text-purple-600';
      case 'photo': return 'fas fa-camera text-yellow-600';
      case 'signature': return 'fas fa-signature text-red-600';
      default: return 'fas fa-file text-gray-600';
    }
  };

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading && !profile) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <i className="fas fa-exclamation-circle text-red-600 mr-2"></i>
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <i className="fas fa-check-circle text-green-600 mr-2"></i>
            <p className="text-green-800">Profile updated successfully!</p>
          </div>
        </div>
      )}

      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
          {isEditing ? (
            <div className="flex space-x-2">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                onClick={handleSave}
                disabled={updating}
              >
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition"
                onClick={handleEditToggle}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              onClick={handleEditToggle}
            >
              Edit Profile
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{profile?.personal_info?.name || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Email</label>
                <p className="font-medium">{profile?.personal_info?.email || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone_number"
                    value={profileData.phone_number}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{profile?.personal_info?.phone_number || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="date_of_birth"
                    value={profileData.date_of_birth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="DD/MM/YYYY"
                  />
                ) : (
                  <p className="font-medium">{profile?.personal_info?.date_of_birth || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Financial Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Financial Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">PAN Number</label>
                <p className="font-medium">{profile?.financial_info?.pan_number || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Aadhaar Number</label>
                <p className="font-medium">{profile?.financial_info?.aadhaar_number || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Bank Account</label>
                <p className="font-medium">{profile?.financial_info?.bank_account_number || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Bank Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="bank_name"
                    value={profileData.bank_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{profile?.financial_info?.bank_name || 'N/A'}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Bank IFSC</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="bank_ifsc"
                    value={profileData.bank_ifsc}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="font-medium">{profile?.financial_info?.bank_ifsc || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <p className="font-medium">{profile?.address_info?.address || 'N/A'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">City</label>
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={profileData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="font-medium">{profile?.address_info?.city || 'N/A'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">State</label>
              {isEditing ? (
                <input
                  type="text"
                  name="state"
                  value={profileData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="font-medium">{profile?.address_info?.state || 'N/A'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Pincode</label>
              {isEditing ? (
                <input
                  type="text"
                  name="pincode"
                  value={profileData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="font-medium">{profile?.address_info?.pincode || 'N/A'}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* KYC Status */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 mb-4">KYC Status</h3>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
              kycStatus?.overall_status === 'verified' 
                ? 'bg-green-100 text-green-800' 
                : kycStatus?.overall_status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              <i className={`fas ${
                kycStatus?.overall_status === 'verified' 
                  ? 'fa-check' 
                  : kycStatus?.overall_status === 'pending'
                  ? 'fa-clock'
                  : 'fa-times'
              }`}></i>
            </div>
            <div>
              <p className="font-medium capitalize">{kycStatus?.overall_status || 'pending'}</p>
              <p className="text-sm text-gray-500">
                {kycStatus?.overall_status === 'verified' 
                  ? `Completed on ${kycStatus?.verified_at || 'N/A'}`
                  : 'KYC verification in progress'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Documents</h2>
        
        {/* Document Upload */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Upload New Document</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Document Type</option>
              <option value="aadhaar">Aadhaar Card</option>
              <option value="pan">PAN Card</option>
              <option value="bank_passbook">Bank Passbook</option>
              <option value="photo">Photograph</option>
              <option value="signature">Signature</option>
            </select>
            
            <input
              id="document-file"
              type="file"
              onChange={handleFileUpload}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept=".jpg,.jpeg,.png,.pdf"
            />
            
            <button
              onClick={handleDocumentUpload}
              disabled={!selectedFile || !documentType || uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>
        </div>

        {/* Documents List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                  <i className={getDocumentIcon(doc.document_type)}></i>
                </div>
                <div>
                  <h3 className="font-medium">{doc.document_type_name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getDocumentStatusColor(doc.verification_status)}`}>
                    {doc.verification_status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Uploaded on {doc.uploaded_at}
              </p>
              {doc.document_number && (
                <p className="text-sm text-gray-600 mb-2">
                  Number: {doc.document_number}
                </p>
              )}
              {doc.rejection_reason && (
                <p className="text-sm text-red-600 mb-2">
                  Reason: {doc.rejection_reason}
                </p>
              )}
              <div className="flex space-x-2">
                <a
                  href={doc.download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm font-medium hover:text-blue-800 transition"
                >
                  View Document
                </a>
                <button className="text-red-600 text-sm font-medium hover:text-red-800 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {documents.length === 0 && (
          <div className="text-center py-8">
            <i className="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No documents uploaded yet.</p>
          </div>
        )}
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Security Settings</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Password</h3>
              <p className="text-sm text-gray-500">Last changed 3 months ago</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition">
              Change Password
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700 transition">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  documents: state.profile.documents,
  kycStatus: state.profile.kycStatus,
  loading: state.profile.loading,
  updating: state.profile.updating,
  uploading: state.profile.uploading,
  error: state.profile.error,
  success: state.profile.success
});

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: bindActionCreators(fetchProfile, dispatch),
  updateProfile: bindActionCreators(updateProfile, dispatch),
  fetchDocuments: bindActionCreators(fetchDocuments, dispatch),
  uploadDocument: bindActionCreators(uploadDocument, dispatch),
  fetchKycStatus: bindActionCreators(fetchKycStatus, dispatch),
  clearProfileError: bindActionCreators(clearProfileError, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);