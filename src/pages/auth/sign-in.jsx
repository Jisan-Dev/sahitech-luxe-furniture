import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      toast.success("Welcome back! logged in successfully.");
      setFormData({
        email: "",
        password: "",
      });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">Log in to your Luxe Furniture account</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full mt-6">
                Sign In
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
