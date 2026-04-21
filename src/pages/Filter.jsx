import { useFood } from "../context/FoodDelivery";

function Filter() {
  const { orders } = useFood();

  const delivered = orders.filter((o) => o.status === "Delivered");
  const cancelled = orders.filter((o) => o.status === "Cancelled");

  return (
    <div>
      <h2 data-testid="delivery-orders">
        Delivered: {delivered.length}
      </h2>

      <h2 data-testid="cancelled-orders">
        Cancelled: {cancelled.length}
      </h2>
    </div>
  );
}

export default Filter;