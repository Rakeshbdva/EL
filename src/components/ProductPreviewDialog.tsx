
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Product } from '../data/mockData';

interface ProductPreviewDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductPreviewDialog: React.FC<ProductPreviewDialogProps> = ({ product, open, onClose }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Product Preview</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Name */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-gray-600">{product.brand}</p>
          </div>

          {/* Nutrition Declaration */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Nutrition Declaration</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Net Volume:</span>
                  <span className="ml-2">{product.netVolume}</span>
                </div>
                <div>
                  <span className="font-medium">Alcohol:</span>
                  <span className="ml-2">{product.alcohol}</span>
                </div>
                <div>
                  <span className="font-medium">Vintage:</span>
                  <span className="ml-2">{product.vintage}</span>
                </div>
                <div>
                  <span className="font-medium">Type:</span>
                  <span className="ml-2">{product.type}</span>
                </div>
                <div>
                  <span className="font-medium">Sugar Content:</span>
                  <span className="ml-2">{product.sugarContent}</span>
                </div>
                <div>
                  <span className="font-medium">Country:</span>
                  <span className="ml-2">{product.country}</span>
                </div>
                <div>
                  <span className="font-medium">Appellation:</span>
                  <span className="ml-2">{product.appellation}</span>
                </div>
                <div>
                  <span className="font-medium">SKU:</span>
                  <span className="ml-2">{product.sku}</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium">EAN:</span>
                  <span className="ml-2">{product.ean}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                Grapes, sulfur dioxide (E220), potassium sorbate (E202). 
                Contains sulfites.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                * This is sample ingredient information. In a real application, 
                ingredients would be linked to the product.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductPreviewDialog;
