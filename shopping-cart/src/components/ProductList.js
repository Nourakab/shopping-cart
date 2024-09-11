import React from 'react';
import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: 'Hammer', price: 12.99, stock: 10 },
  { id: 2, name: 'Screwdriver', price: 8.49, stock: 15 },
  { id: 3, name: 'Wrench', price: 7.99, stock: 5 },
];

function ProductList() {
  const { addToCart } = useCart(); // Access cart functions from context

  return (
    <div>
      <h2>ProductList</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)} {product.stock} in
            stock
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
