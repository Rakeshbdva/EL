
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Navigation from '../components/Navigation';
import { mockIngredients, Ingredient } from '../data/mockData';
import { Plus, Search, Download, Upload, MoreHorizontal, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IngredientList: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(mockIngredients);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ingredient.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ingredient.eNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: string) => {
    navigate(`/ingredients/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setIngredients(ingredients.filter(i => i.id !== id));
    toast({
      title: "Ingredient deleted",
      description: "Ingredient has been successfully deleted.",
    });
  };

  const handleDetails = (id: string) => {
    navigate(`/ingredients/details/${id}`);
  };

  const handleDuplicate = (ingredient: Ingredient) => {
    const newIngredient = {
      ...ingredient,
      id: Date.now().toString(),
      name: `${ingredient.name} (Copy)`,
      eNumber: ingredient.eNumber ? `${ingredient.eNumber}-COPY` : ''
    };
    setIngredients([...ingredients, newIngredient]);
    toast({
      title: "Ingredient duplicated",
      description: "Ingredient has been successfully duplicated.",
    });
  };

  const handleImport = () => {
    toast({
      title: "Import",
      description: "Import functionality will be implemented with backend.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export",
      description: "Export functionality will be implemented with backend.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ingredients</h1>
          <p className="text-gray-600">Manage ingredients and allergen information</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex gap-2">
                <Button 
                  onClick={() => navigate('/ingredients/create')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Button>
                <Button variant="outline" onClick={handleImport}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button variant="outline" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>E Number</TableHead>
                  <TableHead>Allergens</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIngredients.map((ingredient) => (
                  <TableRow key={ingredient.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{ingredient.name}</TableCell>
                    <TableCell>{ingredient.category}</TableCell>
                    <TableCell>{ingredient.eNumber || '-'}</TableCell>
                    <TableCell>
                      {ingredient.allergens.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {ingredient.allergens.map((allergen, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                            >
                              {allergen}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(ingredient.id)}
                        >
                          ✏️
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDetails(ingredient.id)}>
                              <FileText className="h-4 w-4 mr-2" />
                              Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(ingredient.id)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(ingredient.id)}>
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(ingredient)}>
                              Duplicate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientList;
