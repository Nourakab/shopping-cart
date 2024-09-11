import React from 'react';
import { useCart } from '../context/CartContext';

const DiscountInput = () => {
  const { discount, setDiscount } = useCart(); // Access discount and setDiscount from context

  return (
    <div>
      <label>
        Discount (%):
        <input
          type="number"
          min="0"
          max="100"
          value={discount !== undefined ? discount : 0} // Ensure the value is always defined
          onChange={(e) => setDiscount(parseInt(e.target.value))}
        />
      </label>
    </div>
  );
};

export default DiscountInput;
