-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- 1. Allow public read access (Authenticated + Anonymous)
DROP POLICY IF EXISTS "Enable read access for all users" ON transactions;

CREATE POLICY "Enable read access for all users"
ON transactions
FOR SELECT
USING (true);

-- 2. Explicitly allow Anonymous role (if the above doesn't cover it in some setups)
DROP POLICY IF EXISTS "Enable read access for anon" ON transactions;

CREATE POLICY "Enable read access for anon"
ON transactions
FOR SELECT
TO anon
USING (true);

-- 3. Allow updates for all (for Admin status changes)
DROP POLICY IF EXISTS "Enable update access for all users" ON transactions;

CREATE POLICY "Enable update access for all users"
ON transactions
FOR UPDATE
USING (true);
