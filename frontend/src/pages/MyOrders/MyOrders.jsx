import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                `${url}/api/order/userorders`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setData(response.data.data || []);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to fetch orders'); // Set error message
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            {error && <p className="error">{error}</p>}
            <div className="container">
                {data.length > 0 ? (
                    data.map((order) => (
                        <div key={order._id} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="Parcel Icon" />
                            <p>
                                {order.items.map((item, idx) => {
                                    if (idx === order.items.length - 1) {
                                        return `${item.name} x ${item.quantity}`;
                                    } else {
                                        return `${item.name} x ${item.quantity}, `;
                                    }
                                })}
                            </p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
