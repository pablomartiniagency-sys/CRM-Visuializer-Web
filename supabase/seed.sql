-- seed.sql
-- Inserción de datos dummy asumiendo accounts, contacts, orders, etc.

INSERT INTO public.accounts (account_id, nif, legal_name, trade_name, client_type, status)
VALUES
('acc_001', 'B12345678', 'TechCorp Solutions SL', 'TechCorp', 'B2B', 'active'),
('acc_002', 'B87654321', 'Innovación Vertical SA', 'InnoVert', 'B2B', 'active'),
('acc_003', 'A11223344', 'MegaStore Iberia SA', 'MegaStore', 'Retail', 'prospect');

INSERT INTO public.branches (branch_id, account_id, branch_code, branch_fiscal_name, is_main_branch, address_line, city, country)
VALUES
('br_001', 'acc_001', 'HQ-MAD', 'TechCorp Central', true, 'Calle Gran Vía 1', 'Madrid', 'ES'),
('br_002', 'acc_002', 'HQ-BCN', 'InnoVert Hub', true, 'Passatge de la Pau 12', 'Barcelona', 'ES');

INSERT INTO public.contacts (contact_id, account_id, branch_id, full_name, role, is_primary)
VALUES
('cnt_001', 'acc_001', 'br_001', 'Carlos Martínez', 'CEO', true),
('cnt_002', 'acc_002', 'br_002', 'Laura Gómez', 'Operations Manager', true);

INSERT INTO public.contact_methods (method_id, contact_id, type, value_raw, value_norm)
VALUES
('cm_001', 'cnt_001', 'email', 'cmartinez@techcorp.es', 'cmartinez@techcorp.es'),
('cm_002', 'cnt_001', 'phone_mobile', '+34600111222', '34600111222');

INSERT INTO public.leads (lead_id, account_id, contact_id, source_channel, message_summary, intent, urgency, status)
VALUES
('ld_001', 'acc_003', NULL, 'web', 'Interested in custom CRM features', 'High intent', 'high', 'new'),
('ld_002', 'acc_002', 'cnt_002', 'whatsapp', 'Pregunta sobre nuevo pedido de material', 'Support/Sales', 'medium', 'contacted');

INSERT INTO public.orders (order_id, account_id, status, canal_origen, observaciones)
VALUES
('ord_001', 'acc_001', 'confirmed', 'email', 'Pedido trimestral normal'),
('ord_002', 'acc_002', 'draft', 'whatsapp', 'Falta confirmar talla de modelo B');

INSERT INTO public.order_lines (order_id, modelo, talla, cantidad, observaciones)
VALUES
('ord_001', 'Modelo Alpha', 'L', 100, NULL),
('ord_001', 'Modelo Alpha', 'M', 150, NULL),
('ord_002', 'Modelo Beta', 'XL', 50, 'Revisar con cliente');

INSERT INTO public.interactions (interaction_id, account_id, channel, direction, raw_text)
VALUES
('int_001', 'acc_001', 'email', 'inbound', '¿Cuándo llega el pedido ord_001?'),
('int_002', 'acc_001', 'phone', 'outbound', 'Confirmando fecha de entrega para final de semana');

INSERT INTO public.tasks (task_id, account_id, order_id, title, status, priority)
VALUES
('tsk_001', 'acc_001', 'ord_001', 'Confirmar estado de envío', 'open', 'high'),
('tsk_002', 'acc_003', NULL, 'Llamar a prospecto para demo', 'in_progress', 'medium');
