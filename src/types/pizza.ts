// Tipos para el sistema de pedidos de pizzas
export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}

// Item en el carrito con cantidad
export interface CartItem {
  pizza: Pizza;
  quantity: number;
}

// Pedido registrado en el sistema
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "pending" | "completed" | "cancelled";
}
