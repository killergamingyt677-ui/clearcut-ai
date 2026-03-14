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

const Register = () => {
  const [showPw, setShowPw] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleSuccess = (credentialResponse: GoogleCredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received");
      }

      const decoded = parseGoogleToken(credentialResponse.credential);
      
      if (!decoded) {
        throw new Error("Failed to parse token");
      }

      const userData = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        loginTime: new Date().toISOString(),
      };

      storeUserData(userData, credentialResponse.credential);

      toast({
        title: "Success!",
        description: `Welcome, ${userData.name}! Account created.`,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      console.error("Google signup error:", error);
      toast({
        title: "Error",
        description: "Failed to sign up with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleError = () => {
    toast({
      title: "Error",
      description: "Google signup failed. Please try again.",
      variant: "destructive",
    });
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!name || !email || !password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }

      if (password.length < 8) {
        toast({
          title: "Error",
          description: "Password must be at least 8 characters",
          variant: "destructive",
        });
        return;
      }

      const userData = {
        id: `user_${Date.now()}`,
        email,
        name,
        picture: `https://ui-avatars.com/api/?name=${name}&background=random`,
        loginTime: new Date().toISOString(),
      };

      storeUserData(userData, "demo_token_" + Date.now());

      toast({
        title: "Success!",
        description: "Account created successfully!",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Signup failed. Please try again.",
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

        <h1 className="text-2xl font-bold text-center text-foreground mb-2">Create your account</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">Start removing backgrounds for free</p>

        <div className="flex justify-center mb-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            width="100"
          />
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or</span></div>
        </div>

        <form className="space-y-4" onSubmit={handleEmailSignup}>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              placeholder="John Doe" 
              className="bg-muted/50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPw ? "text" : "password"} 
                placeholder="Min 8 characters" 
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
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
