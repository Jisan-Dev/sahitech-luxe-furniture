import { Link } from "react-router";
import SignupForm from "./signup-form";

export default function SignUpPage() {
  const onSubmit = (data) => {
    delete data.confirmPassword;
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground">Join us and start shopping premium furniture</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            <SignupForm onSubmit={onSubmit} />

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-primary font-medium hover:underline">
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
