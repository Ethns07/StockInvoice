
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { mockProducts } from '../lib/mockData';
import { Plus, Search, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  sku: string;
  category?: string;
  stock: number;
  minStock?: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { label: 'Out of Stock', variant: 'destructive' as const };
    if (product.stock <= (product.minStock || 0)) return { label: 'Low Stock', variant: 'secondary' as const };
    return { label: 'In Stock', variant: 'default' as const };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and track stock levels.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product);
          return (
            <Card key={product.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                  </div>
                  <Badge variant={stockStatus.variant}>
                    {stockStatus.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {product.description && (
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  )}
                  {product.category && (
                    <div className="flex items-center text-sm">
                      <Package className="mr-1 h-3 w-3" />
                      {product.category}
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">${product.price}</span>
                    <span className="text-sm text-muted-foreground">
                      Stock: {product.stock}
                      {product.minStock && ` (Min: ${product.minStock})`}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold">No products found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first product.'}
          </p>
        </div>
      )}
    </div>
  );
}
