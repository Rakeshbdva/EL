
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Grid3X3 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleAdminDashboard = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Grid3X3 className="h-6 w-6 text-gray-700" />
              <span className="text-lg font-medium text-gray-900">Open E-Label</span>
            </div>
            
            {/* Navigation */}
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Products</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Ingredients</a>
            </nav>
            
            {/* Login */}
            <button 
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-2xl mx-auto">
          {/* Logo Icon */}
          <div className="mb-12">
            <div className="inline-flex">
              <div className="grid grid-cols-2 gap-2 p-8">
                <div className="w-12 h-12 bg-gray-400 rounded"></div>
                <div className="w-12 h-12 bg-gray-400 rounded"></div>
                <div className="w-12 h-12 bg-gray-400 rounded"></div>
                <div className="w-12 h-12 bg-gray-400 rounded grid grid-cols-2 gap-1 p-2">
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-5xl font-normal text-gray-900 mb-6">
            Open E-Label
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-16">
            Open-source solution for electronic labels.
          </p>
          
          {/* CTA Button */}
          <Button 
            onClick={handleAdminDashboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-medium rounded-md h-12"
          >
            Administration Dashboard
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-sm text-gray-500">
            Electronic label provided by Open E-Label. Web Accessibility Guidelines.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
