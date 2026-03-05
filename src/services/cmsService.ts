import { supabase } from "@/integrations/supabase/client";

// Types
export interface Banner {
  id: string;
  title: string;
  image_url: string;
  link_url?: string;
  type: "hero" | "promotional" | "category";
  display_order: number;
  start_date?: string;
  end_date?: string;
  is_active: boolean;
  created_at?: string;
}

export interface FreshArrival {
  id: string;
  product_id: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: "create" | "update" | "delete";
  table_name: string;
  record_id: string;
  details?: any;
  created_at: string;
}

// CMS Service
export const cmsService = {
  // Banners
  async getBanners() {
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .order("display_order", { ascending: true });
    
    if (error) throw error;
    return data as Banner[];
  },

  async createBanner(banner: Omit<Banner, "id" | "created_at">) {
    const { data, error } = await supabase
      .from("banners")
      .insert(banner)
      .select()
      .single();
    
    if (error) throw error;
    await this.logAction("create", "banners", data.id, banner);
    return data as Banner;
  },

  async updateBanner(id: string, updates: Partial<Banner>) {
    const { data, error } = await supabase
      .from("banners")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    await this.logAction("update", "banners", id, updates);
    return data as Banner;
  },

  async deleteBanner(id: string) {
    const { error } = await supabase
      .from("banners")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    await this.logAction("delete", "banners", id, null);
  },

  // Fresh Arrivals
  async getFreshArrivals() {
    const { data, error } = await supabase
      .from("fresh_arrivals")
      .select("*")
      .order("display_order", { ascending: true });
    
    if (error) throw error;
    return data as FreshArrival[];
  },

  async addFreshArrival(productId: string) {
    const { data, error } = await supabase
      .from("fresh_arrivals")
      .insert({ product_id: productId })
      .select()
      .single();
    
    if (error) throw error;
    await this.logAction("create", "fresh_arrivals", data.id, { product_id: productId });
    return data as FreshArrival;
  },

  async removeFreshArrival(id: string) {
    const { error } = await supabase
      .from("fresh_arrivals")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    await this.logAction("delete", "fresh_arrivals", id, null);
  },

  // Audit Logs
  async logAction(action: "create" | "update" | "delete", table: string, recordId: string, details: any) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("cms_audit_logs").insert({
      user_id: user.id,
      action,
      table_name: table,
      record_id: recordId,
      details
    });
  },

  async getAuditLogs() {
    const { data, error } = await supabase
      .from("cms_audit_logs")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) throw error;
    return data as AuditLog[];
  }
};
