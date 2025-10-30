import { useAuth } from "@/contexts/auth-context";
import { auth } from "@/firebase.config";
import { authApi } from "@/lib/api";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import SigninForm from "./signin-form";

export default function SigninPage() {
  const { signIn, setUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await authApi.loginUser({
        email: data.email,
        password: data.password,
      });
      console.log("res from server on sign-in page", res);

      const { user } = await signIn(data.email, data.password);
      console.log("user from sign-in page after firebase login", user);

      localStorage.setItem("token", res.data.data.token);

      setUser({ ...auth.currentUser, ...res.data.data.user });

      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error during sign-in:", error);
      let errorMessage = "Failed to sign in. Please try again.";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "The email address is not valid.";
          break;
        default:
          errorMessage = error?.response?.data?.message || error.message;
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
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Log in to your Luxe Furniture account
            </p>
          </div>

          <div className="bg-card border-border rounded-lg border p-6 md:p-8">
            <SigninForm onSubmit={onSubmit} />

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-primary font-medium hover:underline"
                >
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
