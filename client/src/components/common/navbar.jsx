import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { BadgeCheckIcon, Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, loading, logOut } = useAuth();

  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const userLogout = async () => {
    await logOut();
    toast.success("Logged out successfully");
  };

  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-foreground font-serif text-2xl font-bold tracking-tight md:text-3xl">
              Luxe
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:bg-accent rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive && "text-accent bg-neutral-800 hover:bg-neutral-800"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `hover:bg-accent rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive && "text-accent bg-neutral-800 hover:bg-neutral-800"
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `hover:bg-accent rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive && "text-accent bg-neutral-800 hover:bg-neutral-800"
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:bg-accent rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive && "text-accent bg-neutral-800 hover:bg-neutral-800"
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-foreground hover:text-primary h-5 w-5 transition-colors" />
              <span className="bg-accent text-accent-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium">
                {totalItemsInCart}
              </span>
            </Link>

            {loading && <Button variant={"outline"}>Loading...</Button>}

            {!loading ? (
              user ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/evilrabbit.png"
                          // src="https://gravatar.com/avatar/2a1e22f9d52902aed453beb6af6a12b7?s=400&d=mp&r=x"
                          alt="@evilrabbit"
                          title={
                            !loading
                              ? user?.displayName || user?.name
                              : "User Avatar"
                          }
                        />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        <p className="text-sm font-medium">My Account</p>
                        <p className="text-muted-foreground text-xs font-medium">
                          {user?.displayName || user?.name}
                          <Badge className="ml-2" variant={"outline"}>
                            <BadgeCheckIcon stroke="green" className="" />
                            {user?.role}
                          </Badge>
                        </p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-sm font-medium">
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-sm font-medium">
                        <Link to="/orders">My Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-sm font-medium">
                        <Link to="/cart">Shopping Cart</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button onClick={userLogout} variant="outline">
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to={"sign-up"}>
                  <Button variant="outline">Sign Up</Button>
                </Link>
              )
            ) : null}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-border border-t py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <NavLink
                to="/"
                className="hover:text-primary text-sm font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className="hover:text-primary text-sm font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </NavLink>
              <NavLink
                to="/about-us"
                className="hover:text-primary text-sm font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                className="hover:text-primary text-sm font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
