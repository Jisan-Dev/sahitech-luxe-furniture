import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router";

// Mock cart data - in a real app, this would come from state management
// const initialCartItems = [
//   {
//     id: 1,
//     name: "Modern Velvet Sofa",
//     price: 1299,
//     quantity: 1,
//     image: "/modern-velvet-sofa.jpg",
//   },
//   {
//     id: 2,
//     name: "Scandinavian Dining Chair",
//     price: 199,
//     quantity: 4,
//     image: "/scandinavian-dining-chair.png",
//   },
// ];

export default function CartPage() {
  // const [cartItems, setCartItems] = useState(initialCartItems);
  const { cart: cartItems, updateCartItemQuantity, removeFromCart } = useCart();

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(id, newQuantity);
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => (sum + item.inSale ? item.salePrice : item.price * item.quantity),
    0
  );
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h1 className="font-serif text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some beautiful furniture to get started
            </p>
            <Link to="/products">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-lg p-4 flex gap-4">
                <img
                  src={item.images[0].url || "/placeholder.svg"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    ${item.inSale ? item.salePrice : item.price}
                  </p>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <Button variant="ghost" size="sm" onClick={() => removeItem(item._id)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-accent" />
                  </Button>
                  <p className="font-bold">
                    ${item.inSale ? item.salePrice : item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                </div>
                {subtotal < 500 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${500 - subtotal} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl">${total}</span>
                </div>
              </div>

              <Link to="/checkout">
                <Button size="lg" className="w-full mb-3">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/products">
                <Button variant="outline" size="lg" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
