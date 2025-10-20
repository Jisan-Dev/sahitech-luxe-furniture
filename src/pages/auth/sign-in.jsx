import { Link } from "react-router";
import SigninForm from "./signin-form";

export default function SigninPage() {
  const onSubmit = (data) => {
    console.log(data);
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
            <SigninForm onSubmit={onSubmit} />

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
