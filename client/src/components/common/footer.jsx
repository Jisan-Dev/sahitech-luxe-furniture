import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-4 font-serif text-2xl font-bold">Luxe</h3>
            <p className="text-background/80 text-sm leading-relaxed">
              Premium furniture for modern living spaces. Quality craftsmanship,
              timeless design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/products"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=sofas"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Sofas
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=chairs"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Chairs
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=tables"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Tables
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4 font-semibold">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold">Get in Touch</h4>
            <ul className="text-background/80 space-y-2 text-sm">
              <li>123 Furniture Street</li>
              <li>New York, NY 10001</li>
              <li>contact@luxefurniture.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-background/20 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-background/60 text-sm">
            © 2025 Luxe Furniture. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="text-background/60 hover:text-background transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-background/60 hover:text-background transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-background/60 hover:text-background transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
