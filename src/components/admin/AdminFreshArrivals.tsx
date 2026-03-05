import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { cmsService, FreshArrival } from "@/services/cmsService";
import { extendedProducts } from "@/data/products";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminFreshArrivals = () => {
  const { t } = useTranslation();
  const [arrivals, setArrivals] = useState<FreshArrival[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  const fetchArrivals = async () => {
    try {
      setIsLoading(true);
      const data = await cmsService.getFreshArrivals();
      setArrivals(data);
    } catch (error) {
      console.error("Error fetching fresh arrivals:", error);
      toast({
        title: t("Error"),
        description: t("Failed to fetch fresh arrivals"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArrivals();
  }, []);

  const handleAdd = async () => {
    if (!selectedProductId) return;
    
    try {
      await cmsService.addFreshArrival(selectedProductId);
      toast({ title: t("Success"), description: t("Product added to Fresh Arrivals") });
      setIsDialogOpen(false);
      fetchArrivals();
    } catch (error) {
      toast({
        title: t("Error"),
        description: t("Failed to add product"),
        variant: "destructive"
      });
    }
  };

  const handleRemove = async (id: string) => {
    if (!confirm(t("Remove this product from Fresh Arrivals?"))) return;
    
    try {
      await cmsService.removeFreshArrival(id);
      toast({ title: t("Success"), description: t("Product removed successfully") });
      fetchArrivals();
    } catch (error) {
      toast({
        title: t("Error"),
        description: t("Failed to remove product"),
        variant: "destructive"
      });
    }
  };

  const getProductDetails = (id: string) => extendedProducts.find(p => p.id === id);

  // Filter out products already in the list
  const availableProducts = extendedProducts.filter(
    p => !arrivals.some(a => a.product_id === p.id)
  );

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{t("Fresh Arrivals Management")}</h2>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus size={16} className="mr-2" />
            {t("Add Product")}
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Product Image")}</TableHead>
                <TableHead>{t("Name")}</TableHead>
                <TableHead>{t("Price")}</TableHead>
                <TableHead>{t("Category")}</TableHead>
                <TableHead className="text-right">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {arrivals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    {isLoading ? t("Loading...") : t("No products in Fresh Arrivals")}
                  </TableCell>
                </TableRow>
              ) : (
                arrivals.map((arrival) => {
                  const product = getProductDetails(arrival.product_id);
                  if (!product) return null;
                  
                  return (
                    <TableRow key={arrival.id}>
                      <TableCell>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell className="capitalize">{product.category}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleRemove(arrival.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("Add to Fresh Arrivals")}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium mb-2 block">{t("Select Product")}</label>
            <Select onValueChange={setSelectedProductId} value={selectedProductId}>
              <SelectTrigger>
                <SelectValue placeholder={t("Search and select product...")} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {availableProducts.map(p => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} - ₹{p.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t("Cancel")}</Button>
            <Button onClick={handleAdd} disabled={!selectedProductId}>{t("Add")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFreshArrivals;
