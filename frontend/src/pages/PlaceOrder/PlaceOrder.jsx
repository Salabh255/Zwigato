import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    // Prepare order items from cart
    const orderItems = food_list.reduce((acc, item) => {
      if (cartItems[item._id] > 0) {
        acc.push({
          ...item,
          quantity: cartItems[item._id]
        });
      }
      return acc;
    }, []);

    const orderData = {
      address: { ...data },
      items: orderItems,
      amount: getTotalCartAmount() + 2
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url); // Redirect to payment gateway
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to cart if not authenticated or cart is empty
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' required />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
        </div>
        <div className="multi-field">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' required />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder='Phone' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>$ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>$ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
