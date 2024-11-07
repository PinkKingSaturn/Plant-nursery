import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CartItem.css';
import { removeItem, updateQuantity } from './CartSlice';


const CartItem = ({onContinueShopping}) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      total += parseFloat(item.cost.substring(1)) * item.quantity;
    });
    return total;
  };

  const handleContinueShopping = (e) => {
 alert("Continue shopping?");
  onContinueShopping(e);
  };

const handleCheckOut = (e) => {
  alert("Functionality to be added in the future!");
  // Clear cart after checkout
  dispatch(removeItem());

};

  const handleIncrement = (item) => {
    // Add item to the cart with increased quantity
    dispatch(updateQuantity({name: item.name, quantity: item.quantity + 1}));

  };

  const handleDecrement = (item) => {
   if (item.quantity > 1) {
    dispatch(updateQuantity({name: item.name, quantity: item.quantity - 1}));
   } else if (item.quantity === 1){
    alert("Removing item");
    dispatch(removeItem(item.name));

   }
  };

  const handleRemove = (item) => {
    if(item.quantity > 0) {
      dispatch(removeItem(item.name));
    }

  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.substring(1)) * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckOut(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;