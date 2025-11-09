/* eslint-disable no-unused-vars */
import { useAuth } from "@/contexts/auth-context";
import { useCreateOrder } from "@/hooks/useOrders";
import { formatPrice } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
// import { ordersAPI } from "../utils/api";
// import { useAuth } from "../context/AuthContext"

export default function Checkout() {
  const navigate = useNavigate();
  const createOrder = useCreateOrder();
  const { user, loading: authLoading } = useAuth();
  console.log(user);
  // const { user } = useAuth()
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   street: "",
  //   city: "",
  //   state: "",
  //   zipCode: "",
  //   country: "",
  //   notes: "",
  // });
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    zipCode: user?.address?.zipCode || "",
    country: user?.address?.country || "",
    notes: "",
  });

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

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1;
  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        notes: formData.notes,
        subtotal,
        tax,
        shipping,
        total,
        paymentMethod: "paypal",
      };

      // if (!user) {
      //   orderData.sessionId = getSessionId();
      // }

      const { data } = await createOrder.mutateAsync(orderData);
      console.log("data", data?.data);
      setOrderNumber(data?.data?.orderNumber);
      setOrderComplete(true);
    } catch (error) {
      console.error("Error creating order:", error);
      alert(
        error.response?.data?.message ||
          "Failed to create order. Please try again.",
      );
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-text-muted">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center py-12">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="bg-surface border-border rounded-lg border p-12">
            <CheckCircle className="mx-auto mb-6 h-24 w-24 text-green-600" />
            <h1 className="mb-4 font-serif text-3xl font-bold md:text-4xl">
              Order Confirmed!
            </h1>
            <p className="text-text-muted mb-6 text-lg">
              Thank you for your order. We've received your order and will
              process it shortly.
            </p>
            <div className="bg-background mb-8 rounded-lg p-6">
              <p className="text-text-muted mb-2 text-sm">Order Number</p>
              <p className="text-primary text-2xl font-bold">{orderNumber}</p>
            </div>
            <p className="text-text-muted mb-8">
              A confirmation email has been sent to{" "}
              <strong>{formData.email}</strong>
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-primary-dark rounded-full px-8 py-3 font-medium text-white transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => navigate("/products")}
                className="bg-surface text-primary border-primary hover:bg-primary rounded-full border-2 px-8 py-3 font-medium transition-colors hover:text-white"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-serif text-3xl font-bold md:text-4xl">
          Checkout
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-surface border-border rounded-lg border p-6">
                <h2 className="mb-6 font-serif text-xl font-bold">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-border focus:ring-primary w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-border focus:ring-primary w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium"
                    >
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="border-border focus:ring-primary w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-surface border-border rounded-lg border p-6">
                <h2 className="mb-6 font-serif text-xl font-bold">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="street"
                      className="mb-2 block text-sm font-medium"
                    >
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      className="border-border focus:ring-primary w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-medium"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="border-border focus:ring-primary w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
                      placeholder="New York"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="mb-2 block text-sm font-medium"
                    >
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="border-border focus:ring-primary w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
                      placeholder="NY"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zipCode"
                      className="mb-2 block text-sm font-medium"
                    >
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="border-border focus:ring-primary w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
                      placeholder="10001"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="mb-2 block text-sm font-medium"
                    >
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="border-border focus:ring-primary w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
                      placeholder="United States"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="notes"
                      className="mb-2 block text-sm font-medium"
                    >
                      Order Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="border-border focus:ring-primary w-full resize-none rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
                      placeholder="Any special instructions for your order..."
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="bg-primary hover:bg-primary-dark w-full rounded-lg py-4 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface border-border sticky top-24 rounded-lg border p-6">
              <h2 className="mb-6 font-serif text-xl font-bold">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="mb-6 max-h-64 space-y-4 overflow-y-auto">
                {cart?.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <img
                      src={item.images[0].url || "/placeholder.svg"}
                      alt={item.name}
                      className="border-border h-16 w-16 flex-shrink-0 rounded-lg border object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="text-text-muted text-sm">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        {formatPrice(item.price * item.quantity)}
                        {/* 12345 */}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-border space-y-3 border-t pt-6">
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

                <div className="border-border border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-primary text-2xl font-bold">
                      {formatPrice(total)}
                    </span>
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
