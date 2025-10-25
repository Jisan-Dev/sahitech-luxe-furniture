/* eslint-disable no-unused-vars */
import { formatPrice } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
// import { ordersAPI } from "../utils/api";
// import { useAuth } from "../context/AuthContext"

export default function Checkout() {
  const navigate = useNavigate();
  // const { user } = useAuth()
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  // const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    notes: "",
  });
  // const [formData, setFormData] = useState({
  //   name: user?.name || "",
  //   email: user?.email || "",
  //   phone: user?.phone || "",
  //   street: user?.address?.street || "",
  //   city: user?.address?.city || "",
  //   state: user?.address?.state || "",
  //   zipCode: user?.address?.zipCode || "",
  //   country: user?.address?.country || "",
  //   notes: "",
  // })

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       if (user) {
  //         const response = await cartAPI.getUserCart();
  //         if (!response.data.data.items || response.data.data.items.length === 0) {
  //           navigate("/cart");
  //           return;
  //         }
  //         setCart(response.data.data);
  //       } else {
  //         const sessionId = getSessionId();
  //         const response = await cartAPI.get(sessionId);
  //         if (!response.data.data.items || response.data.data.items.length === 0) {
  //           navigate("/cart");
  //           return;
  //         }
  //         setCart(response.data.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching cart:", error);
  //       navigate("/cart");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCart();
  // }, [navigate, user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSubmitting(true);

  //   try {
  //     const orderData = {
  //       customerInfo: {
  //         name: formData.name,
  //         email: formData.email,
  //         phone: formData.phone,
  //         address: {
  //           street: formData.street,
  //           city: formData.city,
  //           state: formData.state,
  //           zipCode: formData.zipCode,
  //           country: formData.country,
  //         },
  //       },
  //       notes: formData.notes,
  //     };

  //     // if (!user) {
  //     //   orderData.sessionId = getSessionId();
  //     // }

  //     const response = await ordersAPI.create(orderData);
  //     setOrderNumber(response.data.data.orderNumber);
  //     setOrderComplete(true);
  //   } catch (error) {
  //     console.error("Error creating order:", error);
  //     alert(error.response?.data?.message || "Failed to create order. Please try again.");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-center">
  //         <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
  //         <p className="text-text-muted">Loading checkout...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-surface rounded-lg border border-border p-12">
            <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Order Confirmed!</h1>
            <p className="text-lg text-text-muted mb-6">
              Thank you for your order. We've received your order and will process it shortly.
            </p>
            <div className="bg-background p-6 rounded-lg mb-8">
              <p className="text-sm text-text-muted mb-2">Order Number</p>
              <p className="text-2xl font-bold text-primary">{orderNumber}</p>
            </div>
            <p className="text-text-muted mb-8">
              A confirmation email has been sent to <strong>{formData.email}</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/")}
                className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors">
                Back to Home
              </button>
              <button
                onClick={() => navigate("/products")}
                className="bg-surface text-primary px-8 py-3 rounded-full font-medium border-2 border-primary hover:bg-primary hover:text-white transition-colors">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // const subtotal = cart.totalAmount;
  // const tax = subtotal * 0.1;
  // const shipping = subtotal >= 500 ? 0 : 50;
  // const total = subtotal + tax + shipping;

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form className="space-y-6">
              {/* Contact Information */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <h2 className="text-xl font-serif font-bold mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <h2 className="text-xl font-serif font-bold mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="street" className="block text-sm font-medium mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="New York"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="NY"
                    />
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="10001"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="United States"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="notes" className="block text-sm font-medium mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Any special instructions for your order..."
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-white py-4 rounded-lg font-medium hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {submitting ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-lg border border-border p-6 sticky top-24">
              <h2 className="text-xl font-serif font-bold mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart?.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <img
                      src={item.images[0].url || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border border-border flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                      <p className="text-sm text-text-muted">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold">
                        {formatPrice(item.price * item.quantity)}
                        {/* 12345 */}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Subtotal</span>
                  {/* <span className="font-semibold">12345</span> */}
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Tax (10%)</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
