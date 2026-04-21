import { Link } from "react-router-dom";
import { useFood } from "../context/FoodDelivery";

function Order() {
  const { orders } = useFood();

  return (
    <div>
      <h2 data-testid="total-orders">Total Orders: {orders.length}</h2>

      {orders.map((o) => (
        <div key={o.orderId}>
          <Link to={`/order/${o.orderId}`}>
            {o.customerName} - {o.restaurant}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Order;