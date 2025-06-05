import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Navigation from '../components/Navigation';
import { mockProducts } from '../data/mockData';
import { ArrowLeft, Edit, Trash2, Copy, QrCode, ExternalLink, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
            <Button onClick={() => navigate('/products')} className="mt-4">
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = () => {
    toast({
      title: "Product deleted",
      description: "Product has been successfully deleted.",
    });
    navigate('/products');
  };

  const handleDuplicate = () => {
    toast({
      title: "Product duplicated",
      description: "Product has been successfully duplicated.",
    });
  };

  const handleDeleteImage = () => {
    toast({
      title: "Image deleted",
      description: "Product image has been successfully deleted.",
    });
  };

  const handleChangeImage = () => {
    toast({
      title: "Change image",
      description: "Image change functionality will be implemented.",
    });
  };

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qr-code-${product.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "QR Code downloaded",
        description: "QR code has been successfully downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download QR code. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Generate QR code URL (using a QR code service)
  const labelPublicLink = `http://localhost:5206/l/${product.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(labelPublicLink)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/products')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to List
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-600">{product.brand}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Image */}
            <Card>
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full max-w-md bg-gray-100 rounded-lg flex items-center justify-center h-64">
                    <span className="text-gray-500">Product Image Placeholder</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Image Dimensions: 125×64, 250×129, 500×258, 1000×517, 1500×775, 2000×1034
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Product Information */}
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-gray-700">Product Name:</span>
                  <p className="text-gray-900">{product.name}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Brand:</span>
                  <p className="text-gray-900">{product.brand}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Net Volume:</span>
                  <p className="text-gray-900">{product.netVolume}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Vintage:</span>
                  <p className="text-gray-900">{product.vintage}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <p className="text-gray-900">{product.type}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Sugar Content:</span>
                  <p className="text-gray-900">{product.sugarContent}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Appellation:</span>
                  <p className="text-gray-900">{product.appellation}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Alcohol Content:</span>
                  <p className="text-gray-900">{product.alcohol}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Country:</span>
                  <p className="text-gray-900">{product.country}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">SKU:</span>
                  <p className="text-gray-900">{product.sku}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-700">EAN:</span>
                  <p className="text-gray-900">{product.ean}</p>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Grapes, sulfur dioxide (E220), potassium sorbate (E202). Contains sulfites.
                </p>
                <div className="mt-4">
                  <span className="font-medium text-gray-700">Packaging Gases:</span>
                  <p className="text-gray-900">Nitrogen, Carbon dioxide</p>
                </div>
              </CardContent>
            </Card>

            {/* Nutrition Information */}
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="font-medium text-gray-700">Portion Size:</span>
                  <p className="text-gray-900">100ml</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">kcal:</span>
                  <p className="text-gray-900">83</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">kJ:</span>
                  <p className="text-gray-900">347</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Fat:</span>
                  <p className="text-gray-900">0g</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Carbohydrates:</span>
                  <p className="text-gray-900">2.6g</p>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Organic</Badge>
                  <Badge variant="secondary">Vegetarian</Badge>
                  <Badge variant="secondary">Vegan</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Food Business Operator */}
            <Card>
              <CardHeader>
                <CardTitle>Food Business Operator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <p className="text-gray-900">Producer</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <p className="text-gray-900">Château Example</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <p className="text-gray-900">123 Vineyard Road, Bordeaux, France</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Additional Information:</span>
                  <p className="text-gray-900">Family-owned winery established in 1850</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code & Links */}
            <Card>
              <CardHeader>
                <CardTitle>Digital Assets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code" 
                    className="mx-auto mb-2"
                  />
                  <p className="text-sm text-gray-600 mb-2">QR Code</p>
                  <Button 
                    onClick={handleDownloadQR}
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download QR Code
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Label Public Link:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1 truncate">
                        {labelPublicLink}
                      </code>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-700">External Short Link:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">
                        https://short.ly/abc123
                      </code>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-700">Redirect Link:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">
                        https://redirect.com/wine123
                      </code>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Audit Information */}
            <Card>
              <CardHeader>
                <CardTitle>Audit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Created on:</span>
                  <p className="text-gray-900">5/31/2025 1:01:41 AM</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Created by:</span>
                  <p className="text-gray-900">Admin</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Updated on:</span>
                  <p className="text-gray-900">5/31/2025 1:02:10 AM</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Updated by:</span>
                  <p className="text-gray-900">Admin</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button onClick={handleEdit} className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button onClick={handleDeleteImage} variant="outline" className="w-full justify-start">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Image
                </Button>
                <Button onClick={handleChangeImage} variant="outline" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Change Image
                </Button>
                <Button onClick={handleDuplicate} variant="outline" className="w-full justify-start">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                <Separator />
                <Button onClick={handleDelete} variant="destructive" className="w-full justify-start">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
