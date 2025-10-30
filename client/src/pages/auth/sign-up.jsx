import { useAuth } from "@/contexts/auth-context";
import { auth } from "@/firebase.config";
import { authApi } from "@/lib/api";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import SignupForm from "./signup-form";

export default function SignUpPage() {
  const { createUser, updateUserProfile, setUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    delete data.confirmPassword;
    try {
      const res = await authApi.registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      const { user } = await createUser(data.email, data.password);
      console.log("user from reg page", user);
      updateUserProfile(data.name, data.phone);

      localStorage.setItem("token", res.data.token);
      setUser({ ...auth.currentUser, ...res.data.data });
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Catch error during sign-up:", error.code, error.message);
      let errorMessage = "Failed to create account. Please try again.";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage =
            "The email address is already in use by another account.";
          break;
        case "auth/invalid-email":
          errorMessage = "The email address is not valid.";
          break;
        case "auth/weak-password":
          errorMessage =
            "The password is too weak. Please choose a stronger password.";
          break;
        default:
          errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-foreground mb-2 font-serif text-3xl font-bold md:text-4xl">
              Create Account
            </h1>
            <p className="text-muted-foreground">
              Join us and start shopping premium furniture
            </p>
          </div>

          <div className="bg-card border-border rounded-lg border p-6 md:p-8">
            <SignupForm onSubmit={onSubmit} />

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="text-primary font-medium hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
