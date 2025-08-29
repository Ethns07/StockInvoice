import { useQuery } from "@tanstack/react-query";
import { Package, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import api from "../lib/api";
import { Product } from "../types";

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get("/products");
  return data.data;
};

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const filteredProducts = products?.filter(
    (product) =>
      product &&
      product.name &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (product: Product) => {
    const stock = product?.quantity ?? 0;
    if (stock === 0)
      return { label: "Out of Stock", variant: "destructive" as const };
    if (stock <= 5)
      return { label: "Low Stock", variant: "secondary" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load products. Please try again later.
      </div>
    );
  }

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
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-5 w-1/3" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product);
            return (
              <Card key={product.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      {/* FIX: Access 'product.name' directly */}
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                    </div>
                    <Badge variant={stockStatus.variant}>
                      {stockStatus.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {/* FIX: Access properties directly */}
                    {product.description && (
                      <p className="text-sm text-muted-foreground h-10 truncate">
                        {product.description}
                      </p>
                    )}
                    {product.category && (
                      <div className="flex items-center text-sm">
                        <Package className="mr-1 h-3 w-3" />
                        {product.category}
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-semibold">
                        ${product.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Stock: {product.quantity}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-8 md:col-span-2 lg:col-span-3">
            <Package className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold">No products found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Get started by adding your first product."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
