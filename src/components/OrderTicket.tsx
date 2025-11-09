import { Order } from "@/types/pizza";

interface OrderTicketProps {
  order: Order;
}

// Componente para renderizar el ticket de pedido con estilos de impresión
const OrderTicket = ({ order }: OrderTicketProps) => {
  const orderDate = new Date(order.date);

  return (
    <div className="ticket-content bg-white text-black p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🍕</div>
        <h1 className="text-2xl font-bold">La Bella Pizza</h1>
        <p className="text-sm">Pizzas Artesanales</p>
        <div className="border-t-2 border-dashed border-gray-400 my-4"></div>
      </div>

      <div className="mb-6">
        <p className="text-sm">
          <strong>Pedido:</strong> {order.id}
        </p>
        <p className="text-sm">
          <strong>Fecha:</strong> {orderDate.toLocaleDateString()} {orderDate.toLocaleTimeString()}
        </p>
        <p className="text-sm">
          <strong>Estado:</strong>{" "}
          <span className="capitalize">
            {order.status === "pending" && "Pendiente"}
            {order.status === "completed" && "Completado"}
            {order.status === "cancelled" && "Cancelado"}
          </span>
        </p>
      </div>

      <div className="border-t-2 border-dashed border-gray-400 my-4"></div>

      <div className="mb-6">
        <h2 className="font-bold mb-3">Detalle del Pedido:</h2>
        {order.items.map((item) => (
          <div key={item.pizza.id} className="mb-3">
            <div className="flex justify-between">
              <span>
                {item.quantity}x {item.pizza.name}
              </span>
              <span>${(item.pizza.price * item.quantity).toFixed(2)}</span>
            </div>
            <div className="text-xs text-gray-600 ml-4">
              ${item.pizza.price.toFixed(2)} c/u
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-dashed border-gray-400 my-4"></div>

      <div className="text-right mb-6">
        <p className="text-xl font-bold">
          TOTAL: ${order.total.toFixed(2)}
        </p>
      </div>

      <div className="border-t-2 border-dashed border-gray-400 my-4"></div>

      <div className="text-center text-sm">
        <p>¡Gracias por tu compra!</p>
        <p className="text-xs text-gray-600 mt-2">
          📍 Dirección de la pizzería
        </p>
        <p className="text-xs text-gray-600">📞 Teléfono</p>
        <p className="text-xs text-gray-600">⏰ Lun-Dom 11:00 - 23:00</p>
      </div>
    </div>
  );
};

export default OrderTicket;
