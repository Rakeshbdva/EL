
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate('/products');
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">Login</CardTitle>
          <CardDescription className="text-gray-600">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="a90685766@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-gray-100 border-0 text-gray-900 placeholder:text-gray-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-gray-100 border-0 text-gray-900"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium mt-6"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>
          </form>
          
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create account
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
