import { useState } from "react";
import Navbar from "@/components/Navbar";
import PizzaCard from "@/components/PizzaCard";
import Cart from "@/components/Cart";
import { Pizza, CartItem } from "@/types/pizza";
import { toast } from "sonner";

// Importar imágenes de pizzas
import margheritaImg from "@/assets/pizza-margherita.jpg";
import pepperoniImg from "@/assets/pizza-pepperoni.jpg";
import hawaiianImg from "@/assets/pizza-hawaiian.jpg";
import quattroFormaggiImg from "@/assets/pizza-quattro-formaggi.jpg";
import vegetarianImg from "@/assets/pizza-vegetarian.jpg";
import bbqChickenImg from "@/assets/pizza-bbq-chicken.jpg";

// IMPORTANTE: Reemplazar con el número de WhatsApp de la pizzería
const WHATSAPP_NUMBER = "5491112345678"; // Formato: código de país + número sin espacios ni símbolos

// Catálogo de pizzas disponibles
const pizzaMenu: Pizza[] = [
  {
    id: "1",
    name: "Margherita",
    description: "Salsa de tomate, mozzarella fresca y albahaca",
    price: 12.99,
    image: margheritaImg,
  },
  {
    id: "2",
    name: "Pepperoni",
    description: "Salsa de tomate, mozzarella y pepperoni picante",
    price: 14.99,
    image: pepperoniImg,
  },
  {
    id: "3",
    name: "Hawaiana",
    description: "Salsa de tomate, mozzarella, jamón y piña",
    price: 13.99,
    image: hawaiianImg,
  },
  {
    id: "4",
    name: "Cuatro Quesos",
    description: "Mozzarella, gorgonzola, parmesano y fontina",
    price: 15.99,
    image: quattroFormaggiImg,
  },
  {
    id: "5",
    name: "Vegetariana",
    description: "Pimientos, champiñones, aceitunas, cebolla y tomate",
    price: 13.99,
    image: vegetarianImg,
  },
  {
    id: "6",
    name: "BBQ Chicken",
    description: "Pollo a la parrilla, cebolla morada, cilantro y salsa BBQ",
    price: 16.99,
    image: bbqChickenImg,
  },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Agregar pizza al carrito
  const handleAddToCart = (pizza: Pizza) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.pizza.id === pizza.id);
      
      if (existingItem) {
        // Si ya existe, incrementar cantidad
        return prevItems.map((item) =>
          item.pizza.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, agregar nuevo item
        return [...prevItems, { pizza, quantity: 1 }];
      }
    });
    
    toast.success(`${pizza.name} agregada al carrito`);
  };

  // Actualizar cantidad de un item
  const handleUpdateQuantity = (pizzaId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(pizzaId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.pizza.id === pizzaId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Eliminar item del carrito
  const handleRemoveItem = (pizzaId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.pizza.id !== pizzaId)
    );
    toast.info("Pizza eliminada del carrito");
  };

  // Calcular total de items en el carrito
  const totalItemsInCart = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navbar */}
      <Navbar
        cartItemsCount={totalItemsInCart}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Las Mejores Pizzas
            <span className="block text-primary mt-2">Artesanales</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Ingredientes frescos, recetas tradicionales italianas y el amor por
            la buena comida en cada pizza que hacemos
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-lg">
              <span className="text-2xl">🔥</span>
              <span>Horno de Leña</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <span className="text-2xl">🌿</span>
              <span>Ingredientes Frescos</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <span className="text-2xl">🚀</span>
              <span>Entrega Rápida</span>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Pizzas */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Nuestro Menú
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pizzaMenu.map((pizza) => (
              <PizzaCard
                key={pizza.id}
                pizza={pizza}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="text-3xl mb-4">🍕</div>
          <h3 className="text-xl font-bold mb-2">La Bella Pizza</h3>
          <p className="text-muted-foreground mb-4">
            Pizzas artesanales desde 2024
          </p>
          <p className="text-sm text-muted-foreground">
            📍 Dirección de la pizzería | 📞 Teléfono | ⏰ Lun-Dom 11:00 - 23:00
          </p>
        </div>
      </footer>

      {/* Carrito de Compras */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        phoneNumber={WHATSAPP_NUMBER}
      />
    </div>
  );
};

export default Index;
