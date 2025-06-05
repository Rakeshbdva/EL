import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail } from 'lucide-react';

const EmailConfirmation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="space-y-1 pb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-900">Check Your Email</CardTitle>
          <CardDescription className="text-gray-600">
            We've sent you a confirmation link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-900">
                    Confirmation email sent
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Please check your email inbox and click the confirmation link to activate your account.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>Didn't receive the email?</strong>
              </p>
              <ul className="text-xs space-y-1 text-gray-500">
                <li>• Check your spam/junk folder</li>
                <li>• Make sure you entered the correct email address</li>
                <li>• Wait a few minutes for the email to arrive</li>
              </ul>
            </div>
            
            <Link to="/login">
              <Button className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium">
                Back to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailConfirmation;