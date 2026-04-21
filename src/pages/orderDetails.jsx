import { useParams } from "react-router-dom";
import { useFood } from "../context/FoodDelivery";

function OrderDetails() {
  const { id } = useParams();
  const { orders } = useFood();

  const order = orders.find((o) => String(o.orderId) === id);

  if (!order) return <h2>Order Not Found</h2>;

  return (
    <div>
      <h2>Order Details</h2>

      <p>{order.customerName}</p>

      <ul data-testid="order-items">
        {order.items?.map((item, i) => (
          <li key={i}>
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetails;