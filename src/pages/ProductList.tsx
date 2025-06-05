import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Navigation from '../components/Navigation';
import ProductPreviewDialog from '../components/ProductPreviewDialog';
import { mockProducts, Product } from '../data/mockData';
import { Plus, Search, Download, Upload, MoreHorizontal, Eye, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: string) => {
    navigate(`/products/edit/${id}`);
  };

  const handleDetails = (id: string) => {
    navigate(`/products/details/${id}`);
  };

  const handlePreview = (product: Product) => {
    setPreviewProduct(product);
    setPreviewOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Product deleted",
      description: "Product has been successfully deleted.",
    });
  };

  const handleDuplicate = (product: Product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      name: `${product.name} (Copy)`,
      sku: `${product.sku}-COPY`
    };
    setProducts([...products, newProduct]);
    toast({
      title: "Product duplicated",
      description: "Product has been successfully duplicated.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Manage your product inventory and details</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex gap-2">
                <Button 
                  onClick={() => navigate('/products/create')}
                  className="bg-purple-600 hover:bg-purple-700"
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
                  placeholder="Search products..."
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
                  <TableHead>Net Volume</TableHead>
                  <TableHead>Vintage</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sugar Content</TableHead>
                  <TableHead>Appellation</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.netVolume}</TableCell>
                    <TableCell>{product.vintage}</TableCell>
                    <TableCell>{product.type}</TableCell>
                    <TableCell>{product.sugarContent}</TableCell>
                    <TableCell>{product.appellation}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product.id)}
                        >
                          ✏️
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreview(product)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDetails(product.id)}>
                              <FileText className="h-4 w-4 mr-2" />
                              Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(product.id)}>
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(product)}>
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePreview(product)}>
                              Preview
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

      <ProductPreviewDialog 
        product={previewProduct}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </div>
  );
};

export default ProductList;
