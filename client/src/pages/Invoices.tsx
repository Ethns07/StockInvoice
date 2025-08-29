import { useQuery } from "@tanstack/react-query";
import { Calendar, DollarSign, FileText, Plus, Search } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Skeleton } from "../components/ui/skeleton";
import api from "../lib/api";
import { Invoice } from "../types";

const fetchInvoices = async (): Promise<Invoice[]> => {
  const { data } = await api.get("/invoices?populate=*");
  return data.data;
};

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const {
    data: invoices,
    isLoading,
    isError,
  } = useQuery<Invoice[]>({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
  });

  const filteredInvoices = invoices?.filter((invoice) => {
    if (!invoice) return false;
    const customerName = invoice.customer?.name || "";
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || invoice.invoiceStatus === statusFilter;
    console.log(statusFilter, invoice.invoiceStatus, matchesStatus);
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "overdue":
        return "destructive";
      case "cancelled":
        return "outline";
      default:
        return "secondary";
    }
  };

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load invoices. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Create and manage invoices for your customers.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))
        ) : filteredInvoices && filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => {
            const customerName = invoice.customer?.name || "N/A";
            return (
              <Card key={invoice.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {invoice.invoiceNumber}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {customerName}
                      </p>
                    </div>
                    <Badge variant={getStatusVariant(invoice.invoiceStatus)}>
                      {invoice.invoiceStatus.charAt(0).toUpperCase() +
                        invoice.invoiceStatus.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div>
                        <div>
                          Issued:{" "}
                          {new Date(invoice.issueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div>
                        <div>
                          {invoice.items?.length || 0} item
                          {invoice.items?.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">
                          ${(invoice.total || 0).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold">No invoices found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search terms or filters."
                : "Get started by creating your first invoice in the Strapi admin panel."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
