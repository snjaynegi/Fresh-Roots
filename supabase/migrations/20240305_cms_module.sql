-- Create banners table
CREATE TABLE IF NOT EXISTS banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT,
  type TEXT DEFAULT 'promotional', -- 'hero', 'promotional', 'category'
  display_order INTEGER DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create fresh_arrivals table
CREATE TABLE IF NOT EXISTS fresh_arrivals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit logs table
CREATE TABLE IF NOT EXISTS cms_audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL, -- 'create', 'update', 'delete'
  table_name TEXT NOT NULL,
  record_id TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE fresh_arrivals ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_audit_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public banners view" ON banners FOR SELECT USING (true);
CREATE POLICY "Public fresh_arrivals view" ON fresh_arrivals FOR SELECT USING (true);

CREATE POLICY "Admin manage banners" ON banners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage fresh_arrivals" ON fresh_arrivals FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin view logs" ON cms_audit_logs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin insert logs" ON cms_audit_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
