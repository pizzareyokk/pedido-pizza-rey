import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pizza } from "@/types/pizza";

interface PizzaCardProps {
  pizza: Pizza;
  onAddToCart: (pizza: Pizza) => void;
}

// Tarjeta de pizza individual con imagen, info y botón de agregar
const PizzaCard = ({ pizza, onAddToCart }: PizzaCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-[var(--shadow-hover)] hover:scale-105 duration-300">
      {/* Imagen de la pizza */}
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="w-full h-full object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{pizza.name}</CardTitle>
        <CardDescription>{pizza.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-2xl font-bold text-primary">
          ${pizza.price.toFixed(2)}
        </p>
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => onAddToCart(pizza)}
          className="w-full"
          size="lg"
        >
          <Plus className="mr-2 h-4 w-4" />
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PizzaCard;
