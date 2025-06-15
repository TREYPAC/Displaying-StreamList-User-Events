import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import list from '../data/data';

function Subscriptions() {
  const { cart, addToCart } = useContext(CartContext);
  const [clickedItems, setClickedItems] = useState({});

  const isSubscription = (item) => item.category === 'subscription';
  const isInCart = (item) => cart.some(cartItem => cartItem.id === item.id);

  const handleAdd = (item) => {
    if (isSubscription(item) && isInCart(item)) return; // Block duplicate subs

    addToCart(item);
    setClickedItems((prev) => ({ ...prev, [item.id]: true }));

    setTimeout(() => {
      setClickedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1000);
  };

  const getImageSrc = (img) => {
    if (img === 'local_social') {
      return '/social-subscription.png'; // Public folder path
    }
    return img;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Subscription Details</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {list.map(item => {
          const isSub = isSubscription(item);
          const disabled = (isSub && isInCart(item)) || clickedItems[item.id];

          return (
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
              <button onClick={() => handleAdd(item)} disabled={disabled}>
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Subscriptions;
