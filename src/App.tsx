
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import AuthForm from "./pages/AuthForm";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import ProductDetails from "./pages/ProductDetails";
import IngredientList from "./pages/IngredientList";
import IngredientForm from "./pages/IngredientForm";
import IngredientDetails from "./pages/IngredientDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route wrapper (redirect to products if already authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/products" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <AuthForm />
          </PublicRoute>
        } 
      />
      <Route 
        path="/products" 
        element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/products/create" 
        element={
          <ProtectedRoute>
            <ProductForm />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/products/edit/:id" 
        element={
          <ProtectedRoute>
            <ProductForm />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/products/details/:id" 
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/ingredients" 
        element={
          <ProtectedRoute>
            <IngredientList />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/ingredients/create" 
        element={
          <ProtectedRoute>
            <IngredientForm />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/ingredients/edit/:id" 
        element={
          <ProtectedRoute>
            <IngredientForm />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/ingredients/details/:id" 
        element={
          <ProtectedRoute>
            <IngredientDetails />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
