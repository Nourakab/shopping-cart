import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart.js';
import DiscountInput from './components/DiscountInput.js';
import { CartProvider } from './context/CartContext.js';

function App() {
  return (
    <CartProvider>
      <div>
        <h1>Shopping Cart</h1>
        <ProductList />
        <Cart />
        <DiscountInput />
      </div>
    </CartProvider>
  );
}

export default App;
