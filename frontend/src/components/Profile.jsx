import React from 'react';
import '../Styles/UserProfile.css'; // Make sure to import the CSS file

const UserProfile = () => {
  const user = {
    firstName: 'Sarvesh',
    lastName: 'Pantoji',
    email: 'pantojisarvesh@gmail.com',
    mobileNumber: '',
    username: 'spantoji',
  };

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <h2 className="profile-header">User Profile</h2>
        <div className="profile-info">
          <div className="info-row">
            <span className="info-label">First Name:</span>
            <span className="info-value">{user.firstName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Last Name:</span>
            <span className="info-value">{user.lastName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Username:</span>
            <span className="info-value">{user.username}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Mobile Number:</span>
            <span className="info-value">{user.mobileNumber || 'Not Provided'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
