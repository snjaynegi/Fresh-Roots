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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import { cmsService, Banner } from "@/services/cmsService";
import { ImageUpload } from "../ui/ImageUpload";
import { Checkbox } from "@/components/ui/checkbox";

const AdminBanners = () => {
  const { t } = useTranslation();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<Partial<Banner>>({
    title: "",
    image_url: "",
    link_url: "",
    type: "promotional",
    display_order: 0,
    is_active: true
  });

  const fetchBanners = async () => {
    try {
      setIsLoading(true);
      const data = await cmsService.getBanners();
      setBanners(data);
    } catch (error) {
      console.error("Error fetching banners:", error);
      // Fallback or error toast
      toast({
        title: t("Error"),
        description: t("Failed to fetch banners. Ensure database is set up."),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSave = async () => {
    try {
      if (!currentBanner.title || !currentBanner.image_url) {
        toast({
          title: t("Validation Error"),
          description: t("Title and Image are required"),
          variant: "destructive"
        });
        return;
      }

      if (currentBanner.id) {
        await cmsService.updateBanner(currentBanner.id, currentBanner);
        toast({ title: t("Success"), description: t("Banner updated successfully") });
      } else {
        await cmsService.createBanner(currentBanner as any);
        toast({ title: t("Success"), description: t("Banner created successfully") });
      }
      
      setIsDialogOpen(false);
      fetchBanners();
    } catch (error) {
      console.error("Error saving banner:", error);
      toast({
        title: t("Error"),
        description: t("Failed to save banner"),
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("Are you sure you want to delete this banner?"))) return;
    
    try {
      await cmsService.deleteBanner(id);
      toast({ title: t("Success"), description: t("Banner deleted successfully") });
      fetchBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast({
        title: t("Error"),
        description: t("Failed to delete banner"),
        variant: "destructive"
      });
    }
  };

  const openAddDialog = () => {
    setCurrentBanner({
      title: "",
      image_url: "",
      link_url: "",
      type: "promotional",
      display_order: banners.length + 1,
      is_active: true
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (banner: Banner) => {
    setCurrentBanner(banner);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{t("Banner Management")}</h2>
          <Button onClick={openAddDialog}>
            <Plus size={16} className="mr-2" />
            {t("Add Banner")}
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Preview")}</TableHead>
                <TableHead>{t("Title")}</TableHead>
                <TableHead>{t("Type")}</TableHead>
                <TableHead>{t("Order")}</TableHead>
                <TableHead>{t("Status")}</TableHead>
                <TableHead className="text-right">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    {isLoading ? t("Loading...") : t("No banners found")}
                  </TableCell>
                </TableRow>
              ) : (
                banners.map((banner) => (
                  <TableRow key={banner.id}>
                    <TableCell>
                      <img 
                        src={banner.image_url} 
                        alt={banner.title} 
                        className="w-24 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{banner.title}</TableCell>
                    <TableCell className="capitalize">{banner.type}</TableCell>
                    <TableCell>{banner.display_order}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        banner.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {banner.is_active ? t("Active") : t("Inactive")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openEditDialog(banner)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDelete(banner.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentBanner.id ? t("Edit Banner") : t("Add Banner")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("Title")}</label>
              <Input
                value={currentBanner.title}
                onChange={(e) => setCurrentBanner({...currentBanner, title: e.target.value})}
                placeholder={t("Banner Title")}
              />
            </div>
            
            <ImageUpload
              label={t("Banner Image")}
              value={currentBanner.image_url || ""}
              onChange={(url) => setCurrentBanner({...currentBanner, image_url: url})}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("Type")}</label>
                <Select 
                  value={currentBanner.type} 
                  onValueChange={(val: any) => setCurrentBanner({...currentBanner, type: val})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">{t("Hero")}</SelectItem>
                    <SelectItem value="promotional">{t("Promotional")}</SelectItem>
                    <SelectItem value="category">{t("Category")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("Display Order")}</label>
                <Input
                  type="number"
                  value={currentBanner.display_order}
                  onChange={(e) => setCurrentBanner({...currentBanner, display_order: parseInt(e.target.value)})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("Link URL (Optional)")}</label>
              <Input
                value={currentBanner.link_url || ""}
                onChange={(e) => setCurrentBanner({...currentBanner, link_url: e.target.value})}
                placeholder="/products?category=vegetables"
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="is_active"
                checked={currentBanner.is_active}
                onCheckedChange={(checked) => setCurrentBanner({...currentBanner, is_active: Boolean(checked)})}
              />
              <label htmlFor="is_active" className="text-sm font-medium">
                {t("Active")}
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t("Cancel")}</Button>
            <Button onClick={handleSave}>{t("Save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBanners;
