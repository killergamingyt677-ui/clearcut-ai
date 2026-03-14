import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin, GoogleCredentialResponse } from "@react-oauth/google";
import { useToast } from "@/hooks/use-toast";
import { storeUserData, parseGoogleToken } from "@/lib/auth";

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleSuccess = (credentialResponse: GoogleCredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received from Google");
      }

      // Parse the JWT token to get user info
      const decoded = parseGoogleToken(credentialResponse.credential);
      
      if (!decoded) {
        throw new Error("Failed to parse Google token");
      }

      // Create user object
      const userData = {
        id: decoded.sub || decoded.jti,
        email: decoded.email,
        name: decoded.name || decoded.given_name || "User",
        picture: decoded.picture || "",
        loginTime: new Date().toISOString(),
      };

      if (!userData.email) {
        throw new Error("Email not found in token");
      }

      // Store user data and token
      storeUserData(userData, credentialResponse.credential);

      toast({
        title: "Success!",
        description: `Welcome back, ${userData.name}!`,
      });

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Google login error:", errorMessage);
      console.error("Full error:", error);
      toast({
        title: "Error",
        description: errorMessage || "Failed to login with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleError = () => {
    const errorMessage = "Google login failed - check console for details";
    console.error("Google OAuth error - check your Google Cloud setup");
    toast({
      title: "Error",
      description: `${errorMessage}. Ensure you're using a test account.`,
      variant: "destructive",
    });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }

      // For now, this is a demo. In production, you'd call your backend API
      const userData = {
        id: `user_${Date.now()}`,
        email,
        name: email.split("@")[0],
        picture: `https://ui-avatars.com/api/?name=${email}&background=random`,
        loginTime: new Date().toISOString(),
      };

      storeUserData(userData, "demo_token_" + Date.now());

      toast({
        title: "Success!",
        description: "Logged in successfully!",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md glass-card rounded-lg p-8">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <img src={logo} alt="ZeroBG" className="h-10 w-10 rounded-lg" />
          <span className="text-xl font-bold gradient-text">ZeroBG</span>
        </Link>

        <h1 className="text-2xl font-bold text-center text-foreground mb-2">Welcome back</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">Sign in to your account</p>

        <form className="space-y-4" onSubmit={handleEmailLogin}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              className="bg-muted/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <Input 
                id="password" 
                type={showPw ? "text" : "password"} 
                placeholder="••••••••" 
                className="bg-muted/50 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Button variant="gradient" className="w-full" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or</span></div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            width="100"
          />
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
