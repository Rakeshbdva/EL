
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '../components/Navigation';
import { mockProducts } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;
  
  const existingProduct = isEdit ? mockProducts.find(p => p.id === id) : null;
  
  const [formData, setFormData] = useState({
    name: existingProduct?.name || '',
    brand: existingProduct?.brand || '',
    netVolume: existingProduct?.netVolume || '',
    vintage: existingProduct?.vintage || '',
    type: existingProduct?.type || '',
    sugarContent: existingProduct?.sugarContent || '',
    appellation: existingProduct?.appellation || '',
    alcohol: existingProduct?.alcohol || '',
    country: existingProduct?.country || '',
    sku: existingProduct?.sku || '',
    ean: existingProduct?.ean || '',
    // Additional fields
    packagingGases: '',
    portion: '',
    kcal: '',
    kj: '',
    fat: '',
    carbs: '',
    organic: false,
    vegetarian: false,
    vegan: false,
    operatorType: '',
    operatorName: '',
    operatorAddress: '',
    operatorAdditionalInfo: '',
    externalLink: '',
    redirectLink: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    
    toast({
      title: isEdit ? "Product updated" : "Product created",
      description: `Product ${formData.name} has been successfully ${isEdit ? 'updated' : 'created'}.`,
    });
    
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isEdit ? 'Edit Product' : 'Create New Product'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Update product information' : 'Add a new wine product to your inventory'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Information */}
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="netVolume">Net Volume</Label>
                <Input
                  id="netVolume"
                  name="netVolume"
                  value={formData.netVolume}
                  onChange={handleInputChange}
                  placeholder="e.g., 750ml"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Wine Details */}
          <Card>
            <CardHeader>
              <CardTitle>Wine Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vintage">Vintage</Label>
                <Input
                  id="vintage"
                  name="vintage"
                  value={formData.vintage}
                  onChange={handleInputChange}
                  placeholder="e.g., 2020"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Wine Type</Label>
                <Select onValueChange={(value) => handleSelectChange('type', value)} value={formData.type}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select wine type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Red Wine">Red Wine</SelectItem>
                    <SelectItem value="White Wine">White Wine</SelectItem>
                    <SelectItem value="Rosé Wine">Rosé Wine</SelectItem>
                    <SelectItem value="Champagne">Champagne</SelectItem>
                    <SelectItem value="Sparkling Wine">Sparkling Wine</SelectItem>
                    <SelectItem value="Dessert Wine">Dessert Wine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sugarContent">Sugar Content</Label>
                <Select onValueChange={(value) => handleSelectChange('sugarContent', value)} value={formData.sugarContent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sugar content" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dry">Dry</SelectItem>
                    <SelectItem value="Semi-Dry">Semi-Dry</SelectItem>
                    <SelectItem value="Semi-Sweet">Semi-Sweet</SelectItem>
                    <SelectItem value="Sweet">Sweet</SelectItem>
                    <SelectItem value="Brut">Brut</SelectItem>
                    <SelectItem value="Extra Brut">Extra Brut</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="appellation">Appellation</Label>
                <Input
                  id="appellation"
                  name="appellation"
                  value={formData.appellation}
                  onChange={handleInputChange}
                  placeholder="e.g., Bordeaux AOC"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alcohol">Alcohol Content</Label>
                <Input
                  id="alcohol"
                  name="alcohol"
                  value={formData.alcohol}
                  onChange={handleInputChange}
                  placeholder="e.g., 13.5%"
                />
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="packagingGases">Packaging Gases</Label>
                <Textarea
                  id="packagingGases"
                  name="packagingGases"
                  value={formData.packagingGases}
                  onChange={handleInputChange}
                  placeholder="List packaging gases used..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Nutrition Information */}
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="portion">Portion Size</Label>
                <Input
                  id="portion"
                  name="portion"
                  value={formData.portion}
                  onChange={handleInputChange}
                  placeholder="e.g., 100ml"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kcal">kcal</Label>
                <Input
                  id="kcal"
                  name="kcal"
                  value={formData.kcal}
                  onChange={handleInputChange}
                  placeholder="e.g., 83"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kj">kJ</Label>
                <Input
                  id="kj"
                  name="kj"
                  value={formData.kj}
                  onChange={handleInputChange}
                  placeholder="e.g., 347"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fat">Fat (g)</Label>
                <Input
                  id="fat"
                  name="fat"
                  value={formData.fat}
                  onChange={handleInputChange}
                  placeholder="e.g., 0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carbs">Carbohydrates (g)</Label>
                <Input
                  id="carbs"
                  name="carbs"
                  value={formData.carbs}
                  onChange={handleInputChange}
                  placeholder="e.g., 2.6"
                />
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="organic"
                  checked={formData.organic}
                  onCheckedChange={(checked) => handleCheckboxChange('organic', checked as boolean)}
                />
                <Label htmlFor="organic">Organic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vegetarian"
                  checked={formData.vegetarian}
                  onCheckedChange={(checked) => handleCheckboxChange('vegetarian', checked as boolean)}
                />
                <Label htmlFor="vegetarian">Vegetarian</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vegan"
                  checked={formData.vegan}
                  onCheckedChange={(checked) => handleCheckboxChange('vegan', checked as boolean)}
                />
                <Label htmlFor="vegan">Vegan</Label>
              </div>
            </CardContent>
          </Card>

          {/* Food Business Operator */}
          <Card>
            <CardHeader>
              <CardTitle>Food Business Operator</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="operatorType">Type</Label>
                <Select onValueChange={(value) => handleSelectChange('operatorType', value)} value={formData.operatorType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select operator type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Producer">Producer</SelectItem>
                    <SelectItem value="Distributor">Distributor</SelectItem>
                    <SelectItem value="Importer">Importer</SelectItem>
                    <SelectItem value="Retailer">Retailer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="operatorName">Name</Label>
                <Input
                  id="operatorName"
                  name="operatorName"
                  value={formData.operatorName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="operatorAddress">Address</Label>
                <Textarea
                  id="operatorAddress"
                  name="operatorAddress"
                  value={formData.operatorAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="operatorAdditionalInfo">Additional Information</Label>
                <Textarea
                  id="operatorAdditionalInfo"
                  name="operatorAdditionalInfo"
                  value={formData.operatorAdditionalInfo}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Logistics */}
          <Card>
            <CardHeader>
              <CardTitle>Logistics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country of Origin</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="e.g., France"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ean">EAN</Label>
                <Input
                  id="ean"
                  name="ean"
                  value={formData.ean}
                  onChange={handleInputChange}
                  placeholder="13-digit EAN code"
                />
              </div>
            </CardContent>
          </Card>

          {/* Portability */}
          <Card>
            <CardHeader>
              <CardTitle>Portability</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="externalLink">External Short Link</Label>
                <Input
                  id="externalLink"
                  name="externalLink"
                  value={formData.externalLink}
                  onChange={handleInputChange}
                  placeholder="https://short.link/product"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="redirectLink">Redirect Link</Label>
                <Input
                  id="redirectLink"
                  name="redirectLink"
                  value={formData.redirectLink}
                  onChange={handleInputChange}
                  placeholder="https://redirect.link/product"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {isEdit ? 'Update Product' : 'Create Product'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/products')}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
