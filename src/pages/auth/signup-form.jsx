import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export default function SignupForm({ onSubmit }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Full Name
        </label>
        <Input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          placeholder="John Doe"
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors?.name && <p className="text-xs text-destructive mt-1">{errors.name?.message}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })}
          placeholder="john@example.com"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors?.email && <p className="text-xs text-destructive mt-1">{errors.email?.message}</p>}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone Number
        </label>
        <Input
          id="phone"
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\+?\d[\d\s-]{9,}$/,
              message: "Please enter a valid phone number",
            },
          })}
          placeholder="(555) 123-4567"
          aria-invalid={errors.phone ? "true" : "false"}
        />
        {errors?.phone && <p className="text-xs text-destructive mt-1">{errors.phone?.message}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password
        </label>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="••••••••"
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors?.password && (
          <p className="text-xs text-destructive mt-1">{errors.password?.message}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
          placeholder="••••••••"
          aria-invalid={errors.confirmPassword ? "true" : "false"}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full mt-6">
        Create Account
      </Button>
    </form>
  );
}
