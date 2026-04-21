import { useFood } from "../context/FoodDelivery";
import { useEffect } from "react";

function Stats() {
  const { orders } = useFood();

  const total = orders.length;
  const delivered = orders.filter(o => o.status === "Delivered").length;
  const cancelled = orders.filter(o => o.status === "Cancelled").length;

  // 🔥 Expose to window (IMPORTANT)
  useEffect(() => {
    window.totalOrders = total;
    window.deliveredOrders = delivered;
    window.cancelledOrders = cancelled;
  }, [orders]);

  return (
    <div>
      <h2>Stats</h2>
      <p>Total: {total}</p>
      <p>Delivered: {delivered}</p>
      <p>Cancelled: {cancelled}</p>
    </div>
  );
}

export default Stats;