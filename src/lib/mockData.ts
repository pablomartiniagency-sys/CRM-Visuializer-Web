export const USE_MOCK = false;

export const MOCK_ACCOUNTS = [
  { account_id: 'acc_001', nif: 'B12345678', legal_name: 'TechCorp Solutions SL', trade_name: 'TechCorp', client_type: 'B2B', status: 'active', created_at: new Date().toISOString() },
  { account_id: 'acc_002', nif: 'B87654321', legal_name: 'Innovación Vertical SA', trade_name: 'InnoVert', client_type: 'B2B', status: 'active', created_at: new Date().toISOString() },
  { account_id: 'acc_003', nif: 'A11223344', legal_name: 'MegaStore Iberia SA', trade_name: 'MegaStore', client_type: 'Retail', status: 'prospect', created_at: new Date().toISOString() },
];

export const MOCK_LEADS = [
  { lead_id: 'ld_001', accounts: { legal_name: 'MegaStore Iberia SA' }, source_channel: 'web', message_summary: 'Interested in custom CRM features', intent: 'Alta', status: 'new', created_at: new Date().toISOString() },
  { lead_id: 'ld_002', accounts: { legal_name: 'Innovación Vertical SA' }, source_channel: 'whatsapp', message_summary: 'Pregunta sobre nuevo pedido de material', intent: 'Media', status: 'contacted', created_at: new Date().toISOString() },
];

export const MOCK_ORDERS = [
  { order_id: 'ord_001', accounts: { legal_name: 'TechCorp Solutions SL' }, status: 'confirmed', canal_origen: 'email', observaciones: 'Pedido trimestral normal', created_at: new Date().toISOString() },
  { order_id: 'ord_002', accounts: { legal_name: 'Innovación Vertical SA' }, status: 'draft', canal_origen: 'whatsapp', observaciones: 'Falta confirmar talla', created_at: new Date().toISOString() },
];

export const MOCK_TASKS = [
  { task_id: 'tsk_001', accounts: { legal_name: 'TechCorp Solutions SL' }, title: 'Confirmar estado de envío', status: 'open', priority: 'high', created_at: new Date().toISOString() },
  { task_id: 'tsk_002', accounts: { legal_name: 'MegaStore Iberia SA' }, title: 'Llamar a prospecto', status: 'in_progress', priority: 'medium', created_at: new Date().toISOString() },
];
