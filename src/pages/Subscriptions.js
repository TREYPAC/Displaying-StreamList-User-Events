// src/pages/Details.js
import React from 'react';
import list from '../data/data.js';
import localSocialImg from '../assets/social-subscription.png';


function Details() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Subscription Details</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {list.map(item => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img src={item.img === 'local_social' ? localSocialImg : item.img} alt={item.service}
            width="100%" height="150"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
  }}
/>
            <h3>{item.service}</h3>
            <p>{item.serviceInfo}</p>
            <p><strong>${item.price.toFixed(2)}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Details;
