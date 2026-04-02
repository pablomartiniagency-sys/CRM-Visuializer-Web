-- 0002_enable_rls.sql
-- Enable RLS limitando el acceso solo a usuarios autenticados

ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Allow read/write access to all authenticated users for internal CRM usage.
-- Se asume que todos los usuarios en auth.users pertenecen a la empresa.

CREATE POLICY "Allow full access to authenticated users - Accounts" ON public.accounts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access to authenticated users - Branches" ON public.branches FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access to authenticated users - Contacts" ON public.contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access to authenticated users - Contact Methods" ON public.contact_methods FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access to authenticated users - Leads" ON public.leads FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access to authenticated users - Orders" ON public.orders FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access to authenticated users - Order Lines" ON public.order_lines FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access to authenticated users - Interactions" ON public.interactions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access to authenticated users - Tasks" ON public.tasks FOR ALL TO authenticated USING (true) WITH CHECK (true);
