import { useNavigate } from "react-router";
// import { useOrders } from '@/hooks/useOrders';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { formatDate } from "@/lib/utils";

/**
 * Orders Page - User's Order History
 *
 * APIs Used:
 * - GET /orders (returns user's orders, or all orders if admin)
 *
 * For admin users, this will show all orders
 * For regular users, only their own orders
 */

export default function Orders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  // const { data: ordersData, isLoading } = useOrders();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="mb-4 text-xl">Please login to view your orders</p>
        <Button onClick={() => navigate("/auth")}>Login</Button>
      </div>
    );
  }

  // if (isLoading) {
  //   return <div className="container mx-auto px-4 py-8">Loading orders...</div>;
  // }

  // const orders = ordersData?.data?.data || [];

  const orders = {
    data: {
      data: [
        {
          _id: "67a8f9b2c3d4e5f6g7h8i9j0",
          status: "delivered",
          createdAt: "2024-10-15T14:30:00Z",
          user: {
            name: "John Doe",
            email: "john@example.com",
          },
          items: [
            {
              _id: "item1",
              product: {
                name: "Wireless Headphones",
                _id: "prod1",
              },
              quantity: 1,
              price: 89.99,
            },
            {
              _id: "item2",
              product: {
                name: "USB-C Cable",
                _id: "prod2",
              },
              quantity: 2,
              price: 12.99,
            },
          ],
          totalAmount: 115.97,
          paymentMethod: "Credit Card",
          isPaid: true,
        },
        {
          _id: "58b9c0d1e2f3a4b5c6d7e8f9",
          status: "shipped",
          createdAt: "2024-10-20T09:15:00Z",
          user: {
            name: "Jane Smith",
            email: "jane@example.com",
          },
          items: [
            {
              _id: "item3",
              product: {
                name: "Mechanical Keyboard",
                _id: "prod3",
              },
              quantity: 1,
              price: 149.99,
            },
          ],
          totalAmount: 149.99,
          paymentMethod: "PayPal",
          isPaid: true,
        },
        {
          _id: "49c8d7e6f5a4b3c2d1e0f9a8",
          status: "processing",
          createdAt: "2024-10-25T16:45:00Z",
          user: {
            name: "Mike Johnson",
            email: "mike@example.com",
          },
          items: [
            {
              _id: "item4",
              product: {
                name: "Gaming Mouse",
                _id: "prod4",
              },
              quantity: 1,
              price: 59.99,
            },
            {
              _id: "item5",
              product: {
                name: "Mouse Pad",
                _id: "prod5",
              },
              quantity: 1,
              price: 19.99,
            },
            {
              _id: "item6",
              product: {
                name: "Laptop Stand",
                _id: "prod6",
              },
              quantity: 1,
              price: 45.0,
            },
          ],
          totalAmount: 124.98,
          paymentMethod: "Credit Card",
          isPaid: true,
        },
        {
          _id: "30a1b2c3d4e5f6g7h8i9j0k1",
          status: "pending",
          createdAt: "2024-10-28T11:20:00Z",
          user: {
            name: "Sarah Williams",
            email: "sarah@example.com",
          },
          items: [
            {
              _id: "item7",
              product: {
                name: "Webcam HD",
                _id: "prod7",
              },
              quantity: 1,
              price: 79.99,
            },
          ],
          totalAmount: 79.99,
          paymentMethod: "Cash on Delivery",
          isPaid: false,
        },
        {
          _id: "21b2c3d4e5f6g7h8i9j0k1l2",
          status: "cancelled",
          createdAt: "2024-10-12T08:30:00Z",
          user: {
            name: "Robert Brown",
            email: "robert@example.com",
          },
          items: [
            {
              _id: "item8",
              product: {
                name: "External SSD 1TB",
                _id: "prod8",
              },
              quantity: 1,
              price: 129.99,
            },
            {
              _id: "item9",
              product: {
                name: "Phone Case",
                _id: "prod9",
              },
              quantity: 3,
              price: 15.99,
            },
          ],
          totalAmount: 177.96,
          paymentMethod: "Credit Card",
          isPaid: false,
        },
        {
          _id: "12c3d4e5f6g7h8i9j0k1l2m3",
          status: "delivered",
          createdAt: "2024-09-28T13:10:00Z",
          user: {
            name: "Emily Davis",
            email: "emily@example.com",
          },
          items: [
            {
              _id: "item10",
              product: {
                name: "Bluetooth Speaker",
                _id: "prod10",
              },
              quantity: 1,
              price: 49.99,
            },
          ],
          totalAmount: 49.99,
          paymentMethod: "Debit Card",
          isPaid: true,
        },
      ],
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "processing":
        return "default";
      case "shipped":
        return "default";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">
        {user.role === "admin" ? "All Orders" : "My Orders"}
      </h1>

      {orders.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-xl">No orders found</p>
          <Button onClick={() => navigate("/products")}>Start Shopping</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders?.data?.data.map((order) => (
            <Card key={order._id}>
              <CardContent className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <p className="text-lg font-semibold">
                      Order #{order._id.slice(-8)}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      || {formatDate(order.createdAt)}
                    </p>
                    {user.role === "admin" && (
                      <p className="text-muted-foreground text-sm">
                        Customer: {order.user?.name || "N/A"}
                      </p>
                    )}
                  </div>
                  <Badge variant={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>

                <div className="mb-4 space-y-2">
                  {order.items?.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.product?.name || "Product"} x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-lg font-semibold">
                      Total: ${order.totalAmount?.toFixed(2)}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Payment: {order.paymentMethod}
                      {order.isPaid ? (
                        <Badge variant="default" className="ml-2">
                          Paid
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="ml-2">
                          Unpaid
                        </Badge>
                      )}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/orders/${order._id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
