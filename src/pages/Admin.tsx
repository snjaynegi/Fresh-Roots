import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminProducts from "../components/admin/AdminProducts";
import AdminUsers from "../components/admin/AdminUsers";
import AdminOrders from "../components/admin/AdminOrders";

const Admin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Auth check
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth") === "true";
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "products":
        return <AdminProducts />;
      case "users":
        return <AdminUsers />;
      case "orders":
        return <AdminOrders />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50/50 dark:bg-gray-900/50">
        <AdminSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onLogout={handleLogout} 
        />
        
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="font-semibold text-lg">
              {t(activeTab.charAt(0).toUpperCase() + activeTab.slice(1))}
            </h1>
          </header>
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="mx-auto max-w-7xl">
              {renderContent()}
            </div>
          </main>
        </SidebarInset>
        
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default Admin;
