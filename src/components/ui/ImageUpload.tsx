import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export const ImageUpload = ({ value, onChange, label }: ImageUploadProps) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: t("Invalid file type"),
        description: t("Please upload an image file"),
        variant: "destructive"
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast({
        title: t("File too large"),
        description: t("Image size should be less than 2MB"),
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
      setIsUploading(false);
      toast({
        title: t("Image uploaded"),
        description: t("Image has been updated successfully")
      });
    };
    reader.onerror = () => {
      setIsUploading(false);
      toast({
        title: t("Upload failed"),
        description: t("There was an error uploading the image"),
        variant: "destructive"
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label || t("Image")}
      </label>
      <div className="flex flex-col gap-4">
        <div 
          className="relative group w-full h-40 border-2 border-dashed rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {value ? (
            <>
              <img 
                src={value} 
                alt="Preview" 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Upload className="text-white w-8 h-8" />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <Camera className="w-8 h-8" />
              <span className="text-sm">{t("Click to upload image")}</span>
              <span className="text-xs text-gray-400">{t("Max size 2MB")}</span>
            </div>
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <div className="space-y-2">
          <label className="text-xs text-gray-500">
            {t("Or enter Image URL")}
          </label>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t("Enter image URL")}
            className="h-8 text-xs"
          />
        </div>
      </div>
    </div>
  );
};
