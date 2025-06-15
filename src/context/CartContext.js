import React, { createContext, useContext, useState, useEffect } from 'react';

// Helper to initialize cart from local storage (if available)
function getInitialCart() {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
}

// Create the Cart context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialCart());
  const [total, setTotal] = useState(0);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Update total price and item count whenever cart changes, and sync cart to localStorage
  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
    const newCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartItemsCount(newCount);
    localStorage.setItem('cart', JSON.stringify(cart));  // persist cart
  }, [cart]);

  // Add an item to the cart (or increment if it already exists)
  const addToCart = (product) => {
    // Prevent adding more than one of any subscription (IDs 1-4)
    if (product.id >= 1 && product.id <= 4) {
      // If this subscription is already in the cart, do nothing
      if (cart.find(item => item.id === product.id)) {
        return;
      }
    }
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      // For existing non-subscription items, increment the quantity
      const updatedCart = cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      setCart(updatedCart);
    } else {
      // Add new item with quantity 1
      const newItem = { ...product, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };

  // Remove an item from the cart by its id
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Increase item quantity by 1 (with subscription check)
  const incrementItem = (id) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    if (id >= 1 && id <= 4) {
      // Subscription items should not exceed quantity 1, so ignore increment
      return;
    }
    // Increment quantity for non-subscription items
    const updatedCart = cart.map(i =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    );
    setCart(updatedCart);
  };

  // Decrease item quantity by 1 (remove item if quantity goes to 0)
  const decrementItem = (id) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    if (item.quantity === 1) {
      // Removing the last item (quantity would become 0)
      setCart(cart.filter(i => i.id !== id));
    } else {
      const updatedCart = cart.map(i =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
      setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      total,
      cartItemsCount,
      addToCart,
      removeItem,
      incrementItem,
      decrementItem
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCart = () => useContext(CartContext);
