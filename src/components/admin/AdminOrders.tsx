import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

// Mock Order Interface
interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: number;
  paymentMethod: string;
}

// Initial empty state
const mockOrders: Order[] = [];

const AdminOrders = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus as any } : order
    ));
    toast({
      title: t("Order Updated"),
      description: t(`Order ${orderId} status changed to ${newStatus}`),
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      processing: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      shipped: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      delivered: "bg-green-100 text-green-800 hover:bg-green-200",
      cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">{t("Order Management")}</h2>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> {t("Export Orders")}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("Search orders...")}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("Filter by status")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("All Statuses")}</SelectItem>
            <SelectItem value="pending">{t("Pending")}</SelectItem>
            <SelectItem value="processing">{t("Processing")}</SelectItem>
            <SelectItem value="shipped">{t("Shipped")}</SelectItem>
            <SelectItem value="delivered">{t("Delivered")}</SelectItem>
            <SelectItem value="cancelled">{t("Cancelled")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("Order ID")}</TableHead>
              <TableHead>{t("Customer")}</TableHead>
              <TableHead>{t("Date")}</TableHead>
              <TableHead>{t("Status")}</TableHead>
              <TableHead>{t("Total")}</TableHead>
              <TableHead className="text-right">{t("Actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">{t("No orders found")}</TableCell>
              </TableRow>
            ) :
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadge(order.status)}>
                    {t(order.status.charAt(0).toUpperCase() + order.status.slice(1))}
                  </Badge>
                </TableCell>
                <TableCell>₹{order.total}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsDetailsOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Select 
                      defaultValue={order.status} 
                      onValueChange={(val) => handleStatusChange(order.id, val)}
                    >
                      <SelectTrigger className="w-[130px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">{t("Pending")}</SelectItem>
                        <SelectItem value="processing">{t("Processing")}</SelectItem>
                        <SelectItem value="shipped">{t("Shipped")}</SelectItem>
                        <SelectItem value="delivered">{t("Delivered")}</SelectItem>
                        <SelectItem value="cancelled">{t("Cancelled")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("Order Details")} - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              {t("View complete order information")}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-500">{t("Customer")}</h4>
                  <p>{selectedOrder.customer}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500">{t("Date")}</h4>
                  <p>{selectedOrder.date}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500">{t("Payment Method")}</h4>
                  <p>{selectedOrder.paymentMethod}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500">{t("Total Items")}</h4>
                  <p>{selectedOrder.items}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>{t("Total Amount")}</span>
                  <span>₹{selectedOrder.total}</span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)}>{t("Close")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
