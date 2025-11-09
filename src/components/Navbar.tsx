import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

// Barra de navegación con logo y contador del carrito
const Navbar = ({ cartItemsCount, onCartClick }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-3xl">🍕</div>
          <h1 className="text-2xl font-bold text-primary">La Bella Pizza</h1>
        </div>

        {/* Botón del carrito */}
        <Button
          variant="outline"
          size="lg"
          className="relative"
          onClick={onCartClick}
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItemsCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
              {cartItemsCount}
            </Badge>
          )}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
