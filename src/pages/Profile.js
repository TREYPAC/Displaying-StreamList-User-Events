import React, { useState, useEffect } from 'react';

function Profile() {
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  // Load saved data from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('profileName');
    const savedPreferences = localStorage.getItem('profilePreferences');
    const savedPic = localStorage.getItem('profilePic');

    if (savedName) setName(savedName);
    if (savedPreferences) setPreferences(savedPreferences);
    if (savedPic) setProfilePic(savedPic);
  }, []);

  // Save data to localStorage
  const handleSave = () => {
    localStorage.setItem('profileName', name);
    localStorage.setItem('profilePreferences', preferences);
    if (profilePic) localStorage.setItem('profilePic', profilePic);
    alert('Profile saved!');
  };

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>My EZTechMovie Profile</h2>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <label htmlFor="upload" style={{ cursor: 'pointer' }}>
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#ccc',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2rem',
              }}
            >
              👤
            </div>
          )}
        </label>
        <input
          id="upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>My Preferences</label>
        <textarea
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          placeholder="What genres or shows do you like?"
          rows="4"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <button
        onClick={handleSave}
        style={{
          padding: '12px 20px',
          backgroundColor: '#222',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Save Profile
      </button>
    </div>
  );
}

export default Profile;
