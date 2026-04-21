import React from "react";
import { Routes, Route } from "react-router-dom";

import Order from "./pages/order";
import OrderDetails from "./pages/orderDetails";
import Filter from "./pages/Filter";
import Stats from "./pages/stats";
import { useFood } from "./context/FoodDelivery";
import "./App.css";

const AppRouter = () => {
  const Home = () => {
    const [count, setCount] = React.useState(0);
    const { orders, loading, token, dataUrl } = useFood();

    const shareableLink = token 
      ? `${window.location.origin}?token=${token}&dataset=${encodeURIComponent(dataUrl)}`
      : '';

    const copyLink = async () => {
      if (navigator.clipboard && shareableLink) {
        await navigator.clipboard.writeText(shareableLink);
        alert('Link copied to clipboard!');
      }
    };

    return (
      <div style={{ padding: "20px" }}>
        <h1>Food Delivery App</h1>

        {/* Counter */}
        <button onClick={() => setCount(count + 1)}>
          Count is {count}
        </button>

        <hr />

        {/* Token Shareable Link */}
        {!loading && token && (
          <div style={{ background: '#e8f5e8', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>Shareable Token Link</h3>
            <p><strong>Link:</strong> <a href={shareableLink} target="_blank" rel="noopener noreferrer">{shareableLink}</a></p>
            <button onClick={copyLink} style={{ background: '#4CAF50', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Copy Link
            </button>
            <p><small>Token: <code>{token}</code> | Dataset URL: <code>{dataUrl}</code></small></p>
          </div>
        )}

        {/* Dataset Display */}
        {loading ? (
          <h2>Loading orders...</h2>
        ) : (
          <div>
            <h2>Orders List</h2>

            {orders.length === 0 ? (
              <p>No orders found</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.orderId}
                  style={{
                    border: "1px solid gray",
                    margin: "10px",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <p><b>Order ID:</b> {order.orderId}</p>
                  <p><b>Customer:</b> {order.customerName}</p>
                  <p><b>Restaurant:</b> {order.restaurant}</p>
                  <p><b>Total Amount:</b> ₹{order.totalAmount}</p>
                  <p><b>Status:</b> {order.status}</p>
                  <p><b>Delivery Time:</b> {order.deliveryTime} mins</p>
                  <p><b>Rating:</b> {order.rating || "N/A"}</p>

                  {/* Items */}
                  <div>
                    <b>Items:</b>
                    <ul>
                      {order.items?.map((item, index) => (
                        <li key={index}>
                          {item.name} - ₹{item.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app-router">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </div>
  );
};

export default AppRouter;

