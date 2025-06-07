// src/pages/Subscriptions.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import list from '../data/data';
import localSocialImg from '../assets/social-subscription.png'; // Only needed if "local_social" is used

function Subscriptions() {
  const { addToCart } = useContext(CartContext);

  const getImageSrc = (img) => {
    if (img === 'local_social') {
      return localSocialImg;
    }
    return img;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Subscription Details</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {list.map(item => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: 10, width: 200 }}>
            <img
              src={getImageSrc(item.img)}
              alt={item.service}
              width="100%"
              height="150"
              style={{ objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=No+Image';
              }}
            />
            <h3>{item.service}</h3>
            <p>{item.serviceInfo}</p>
            <p><strong>${item.price.toFixed(2)}</strong></p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;
