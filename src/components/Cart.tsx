import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types/pizza";
import { toast } from "sonner";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (pizzaId: string, newQuantity: number) => void;
  onRemoveItem: (pizzaId: string) => void;
  phoneNumber: string; // Número de WhatsApp de la pizzería
}

// Componente del carrito de compras con funcionalidad de WhatsApp
const Cart = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  phoneNumber,
}: CartProps) => {
  // Calcular el total del pedido
  const total = cartItems.reduce(
    (sum, item) => sum + item.pizza.price * item.quantity,
    0
  );

  // Generar mensaje para WhatsApp con el pedido completo
  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }

    let message = "🍕 *Nuevo Pedido - La Bella Pizza*\n\n";
    
    cartItems.forEach((item) => {
      message += `• ${item.quantity}x ${item.pizza.name}\n`;
      message += `  $${(item.pizza.price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `*Total: $${total.toFixed(2)}*`;

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abrir WhatsApp con el mensaje
    window.open(
      `https://wa.me/+54 9 11 2846-1327?text=${encodedMessage}`,
      "_blank"
    );
    
    toast.success("Redirigiendo a WhatsApp...");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Tu Pedido
          </SheetTitle>
          <SheetDescription>
            Revisa tu pedido antes de enviarlo
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              {/* Lista de items en el carrito */}
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.pizza.id}
                    className="flex gap-4 p-4 bg-card rounded-lg border"
                  >
                    <img
                      src={item.pizza.image}
                      alt={item.pizza.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.pizza.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.pizza.price.toFixed(2)} c/u
                      </p>
                      
                      {/* Controles de cantidad */}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            onUpdateQuantity(item.pizza.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            onUpdateQuantity(item.pizza.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto text-destructive"
                          onClick={() => onRemoveItem(item.pizza.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        ${(item.pizza.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Total y botón de compra */}
              <div className="space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={generateWhatsAppMessage}
                >
                  Enviar pedido por WhatsApp
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
