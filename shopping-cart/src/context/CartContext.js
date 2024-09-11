// Context API: Manages cart state and logic in one place
import React, { createContext, useContext, useState } from 'react';

//1.Create the CartContext
const CartContext = createContext();

//2.Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

//3.CartProvider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);

  //Functions to manage Cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    //if the product already exists in the cart
    if (existingItem) {
      setCart(
        cart.map(
          (item) =>
            item.id === product.id && item.quantity < item.stock
              ? //This checks if the current item in the cart is the one being added and if its quantity is less than the stock.
                { ...item, quantity: item.quantity + 1 }
              : item, //returns the item unchanged
        ),
      );
    } else {
      //if the product does not exist in the cart
      //Adds a new item to the cart with an initial quantity of 1 if it’s not already in the cart.
      setCart([...cart, { ...product, quantity: 1 }]);
      //[...]: This creates a new array by spreading the existing cart items.
      //...product: Spreads the existing properties of the product into the new object.
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    //item.id !== id: This condition checks if the item's id does not match the id provided to the function.
    //filtering method excludes the item with the matching id from the new array.
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      setCart(
        cart.map((item) =>
          item.id === id && quantity <= item.stock //to ensure the quantity being set is within the available stock
            ? { ...item, quantity: quantity }
            : item,
        ),
      );
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const tax = subtotal * 0.15;
    const discountedTotal = subtotal - (subtotal * discount) / 100;
    return discountedTotal + tax;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        handleQuantityChange,
        calculateTotal,
        discount,
        setDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
