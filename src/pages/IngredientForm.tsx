
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
import { mockIngredients } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';

const IngredientForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;
  
  const existingIngredient = isEdit ? mockIngredients.find(i => i.id === id) : null;
  
  const [formData, setFormData] = useState({
    name: existingIngredient?.name || '',
    category: existingIngredient?.category || '',
    otherIngredient: '',
    eNumber: existingIngredient?.eNumber || '',
    allergens: existingIngredient?.allergens || []
  });

  const allergenOptions = [
    'gluten',
    'nuts',
    'milk',
    'eggs',
    'fish',
    'shellfish',
    'soy',
    'sulfites',
    'sesame',
    'mustard',
    'celery',
    'lupin'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleAllergenChange = (allergen: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      allergens: checked 
        ? [...prev.allergens, allergen]
        : prev.allergens.filter(a => a !== allergen)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    
    toast({
      title: isEdit ? "Ingredient updated" : "Ingredient created",
      description: `Ingredient ${formData.name} has been successfully ${isEdit ? 'updated' : 'created'}.`,
    });
    
    navigate('/ingredients');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isEdit ? 'Edit Ingredient' : 'Create New Ingredient'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Update ingredient information' : 'Add a new ingredient to your database'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ingredient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ingredient Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter ingredient name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={handleSelectChange} value={formData.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Preservative">Preservative</SelectItem>
                    <SelectItem value="Antioxidant">Antioxidant</SelectItem>
                    <SelectItem value="Colorant">Colorant</SelectItem>
                    <SelectItem value="Flavoring">Flavoring</SelectItem>
                    <SelectItem value="Stabilizer">Stabilizer</SelectItem>
                    <SelectItem value="Emulsifier">Emulsifier</SelectItem>
                    <SelectItem value="Acidifier">Acidifier</SelectItem>
                    <SelectItem value="Fining Agent">Fining Agent</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherIngredient">Other Ingredient Details</Label>
                <Textarea
                  id="otherIngredient"
                  name="otherIngredient"
                  value={formData.otherIngredient}
                  onChange={handleInputChange}
                  placeholder="Additional details about the ingredient..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eNumber">E Number</Label>
                <Input
                  id="eNumber"
                  name="eNumber"
                  value={formData.eNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., E220"
                />
              </div>

              <div className="space-y-4">
                <Label>Allergens</Label>
                <div className="grid grid-cols-2 gap-4">
                  {allergenOptions.map((allergen) => (
                    <div key={allergen} className="flex items-center space-x-2">
                      <Checkbox
                        id={allergen}
                        checked={formData.allergens.includes(allergen)}
                        onCheckedChange={(checked) => 
                          handleAllergenChange(allergen, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={allergen}
                        className="text-sm font-normal capitalize"
                      >
                        {allergen}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {isEdit ? 'Update Ingredient' : 'Save Ingredient'}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/ingredients')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IngredientForm;
