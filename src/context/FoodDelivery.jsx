import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState('');
  const [dataUrl, setDataUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("FETCH STARTED...");

      try {
        const tokenRes = await axios.post(
          "https://t4e-testserver.onrender.com/api",
          {
            studentId: "E0323012",
            password: "760198",
            set: "setA",
          }
        );

        console.log("TOKEN RESPONSE:", tokenRes.data);

        const tokenVal = tokenRes.data.token;
        const dataUrlVal = tokenRes.data.dataUrl;

        setToken(tokenVal);
        setDataUrl(dataUrlVal);

        const ordersRes = await axios.get(dataUrlVal, {
          headers: {
            Authorization: `Bearer ${tokenVal}`,
          },
        });

        console.log("DATA ONLY:", ordersRes.data);

        const data = ordersRes.data;

        let finalOrders = [];

        if (Array.isArray(data)) {
          finalOrders = data;
        } else if (Array.isArray(data.orders)) {
          finalOrders = data.orders;
        } else if (data.data && Array.isArray(data.data.orders)) {
          finalOrders = data.data.orders;
        }

        console.log("FINAL ORDERS:", finalOrders);

        setOrders(finalOrders);

        window.totalOrders = finalOrders.length;
        window.deliveredOrders = finalOrders.filter(
          (o) => o.status === "delivered"
        ).length;
        window.cancelledOrders = finalOrders.filter(
          (o) => o.status === "cancelled"
        ).length;

        setLoading(false);
      } catch (err) {
        console.error("ERROR:", err);
        console.log("ERROR RESPONSE:", err.response);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <FoodContext.Provider value={{ orders, loading, token, dataUrl }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);
