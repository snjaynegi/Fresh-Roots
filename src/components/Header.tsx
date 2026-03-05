
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Input } from "./ui/input";
import { Heart, User, LogOut } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useState, useEffect } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface HeaderProps {
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

const Header = ({ showSearch, searchQuery, onSearchChange }: HeaderProps) => {
  const { t } = useTranslation();
  const { state } = useCart();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const confirmLogout = async () => {
    await signOut();
    setIsLogoutDialogOpen(false);
    toast({
      title: t("Logged out"),
      description: t("You have been successfully logged out"),
    });
  };

  const handleLogoutClick = () => {
    setIsLogoutDialogOpen(true);
  };

  return (
    <header className="bg-gradient-to-r from-[#F1F0FB] to-white shadow-md dark:from-green-900 dark:to-gray-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo Section */}
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors dark:text-green-400"
              aria-label={t("FreshRoot")}
            >
              {t("FreshRoot")}
            </Link>
            
            {/* Mobile Menu Toggle could go here if needed */}
          </div>

          {/* Desktop Search Bar - Centered */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder={t("Search products...")}
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full pl-4 pr-10 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:ring-primary"
                  aria-label={t("Search products")}
                />
              </div>
            </div>
          )}

          {/* Right Actions Section */}
          <div className="flex items-center justify-end space-x-6">
            <ThemeSwitcher />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors dark:text-gray-200 font-medium">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline text-base">{user.user_metadata?.name || t("Account")}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-gray-800 border dark:border-gray-700">
                  <DropdownMenuLabel className="dark:text-gray-300">{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="dark:text-gray-300 cursor-pointer">
                    {t("Profile Settings")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orders")} className="dark:text-gray-300 cursor-pointer">
                    {t("Order History")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogoutClick} className="text-red-500 dark:text-red-400 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("Logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-base font-medium text-gray-700 hover:text-primary transition-colors dark:text-gray-200"
                  aria-label={t("Sign in")}
                >
                  {t("Sign in")}
                </Link>
                <Link
                  to="/signup"
                  className="text-base font-medium px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
                  aria-label={t("Sign up")}
                >
                  {t("Sign up")}
                </Link>
              </div>
            )}
            
            <Link
              to="/wishlist"
              className="text-gray-700 hover:text-primary transition-colors dark:text-gray-200"
              aria-label={t("Wishlist")}
            >
              <Heart className="w-6 h-6" />
            </Link>
            <Link to="/cart" className="relative group" aria-label={t("Cart")}>
              <svg
                className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors dark:text-gray-200"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              {state.items.length > 0 && (
                <span 
                  className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce"
                  aria-label={t("Cart items count")}
                >
                  {state.items.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar - Visible only on mobile */}
        {showSearch && (
          <div className="mt-4 md:hidden">
            <Input
              type="search"
              placeholder={t("Search products...")}
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
              aria-label={t("Search products")}
            />
          </div>
        )}
      </div>

      <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Confirm Logout")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("Are you sure you want to logout? You will need to login again to access your account.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout} className="bg-red-600 hover:bg-red-700">
              {t("Logout")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default Header;
