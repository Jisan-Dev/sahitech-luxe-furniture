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
    (sum, item) =>
      sum + (item.inSale ? item.salePrice : item.price) * item.quantity,
    0,
  );
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="py-12 text-center">
            <h1 className="mb-4 font-serif text-3xl font-bold">
              Your cart is empty
            </h1>
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
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-foreground mb-8 font-serif text-3xl font-bold md:text-4xl">
          Shopping Cart
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-card border-border flex gap-4 rounded-lg border p-4"
              >
                <img
                  src={item.images[0].url || "/placeholder.svg"}
                  alt={item.name}
                  className="h-24 w-24 rounded object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-foreground mb-2 font-medium">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    ${item.inSale ? item.salePrice : item.price}
                  </p>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item._id)}
                  >
                    <Trash2 className="text-muted-foreground hover:text-accent h-4 w-4" />
                  </Button>
                  <p className="font-bold">
                    $
                    {(item.inSale ? item.salePrice : item.price) *
                      item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border-border sticky top-24 rounded-lg border p-6">
              <h2 className="mb-6 font-serif text-xl font-bold">
                Order Summary
              </h2>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "FREE" : `$${shipping}`}
                  </span>
                </div>
                {subtotal < 500 && (
                  <p className="text-muted-foreground text-xs">
                    Add ${500 - subtotal} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-border mb-6 border-t pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">${total}</span>
                </div>
              </div>

              <Link to="/checkout">
                <Button size="lg" className="mb-3 w-full">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full bg-transparent"
                >
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
