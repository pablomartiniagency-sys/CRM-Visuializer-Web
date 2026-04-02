-- 0001_initial_schema.sql
-- This migration contains the exact initial schema provided by the user.

CREATE TABLE public.accounts (
  account_id text NOT NULL,
  nif text UNIQUE,
  legal_name text NOT NULL,
  trade_name text,
  client_type text,
  agent text,
  status text NOT NULL DEFAULT 'active'::text CHECK (status = ANY (ARRAY['active'::text, 'inactive'::text, 'prospect'::text])),
  source_codes text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT accounts_pkey PRIMARY KEY (account_id)
);

CREATE TABLE public.branches (
  branch_id text NOT NULL,
  account_id text NOT NULL,
  branch_code text,
  branch_fiscal_name text,
  branch_trade_name text,
  is_main_branch boolean NOT NULL DEFAULT false,
  address_line text,
  city text,
  province text,
  postal_code text,
  country text DEFAULT 'ES'::text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT branches_pkey PRIMARY KEY (branch_id),
  CONSTRAINT branches_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.accounts(account_id)
);

CREATE TABLE public.contacts (
  contact_id text NOT NULL,
  branch_id text NOT NULL,
  account_id text NOT NULL,
  full_name text NOT NULL DEFAULT 'General'::text,
  role text,
  is_primary boolean NOT NULL DEFAULT false,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT contacts_pkey PRIMARY KEY (contact_id),
  CONSTRAINT contacts_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id),
  CONSTRAINT contacts_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.accounts(account_id)
);

CREATE TABLE public.contact_methods (
  method_id text NOT NULL,
  contact_id text NOT NULL,
  type text NOT NULL CHECK (type = ANY (ARRAY['email'::text, 'phone_landline'::text, 'phone_mobile'::text, 'fax'::text, 'other'::text])),
  value_raw text NOT NULL,
  value_norm text NOT NULL,
  is_primary boolean NOT NULL DEFAULT false,
  validated boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT contact_methods_pkey PRIMARY KEY (method_id),
  CONSTRAINT contact_methods_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contacts(contact_id)
);

CREATE TABLE public.leads (
  lead_id text NOT NULL,
  account_id text,
  contact_id text,
  source_channel text NOT NULL CHECK (source_channel = ANY (ARRAY['whatsapp'::text, 'email'::text, 'web'::text, 'instagram'::text, 'facebook'::text, 'phone'::text, 'other'::text])),
  message_summary text NOT NULL,
  intent text NOT NULL,
  urgency text CHECK (urgency = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text])),
  status text NOT NULL DEFAULT 'new'::text CHECK (status = ANY (ARRAY['new'::text, 'contacted'::text, 'qualified'::text, 'won'::text, 'lost'::text])),
  owner text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT leads_pkey PRIMARY KEY (lead_id),
  CONSTRAINT leads_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.accounts(account_id),
  CONSTRAINT leads_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contacts(contact_id)
);

CREATE TABLE public.orders (
  order_id text NOT NULL,
  account_id text NOT NULL,
  branch_id text,
  lead_id text,
  version integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'pending_info'::text, 'ready_quote'::text, 'quoted'::text, 'confirmed'::text, 'in_production'::text, 'closed'::text, 'cancelled'::text])),
  canal_origen text CHECK (canal_origen = ANY (ARRAY['email'::text, 'whatsapp'::text, 'otro'::text])),
  temporada text,
  fecha_objetivo date,
  tintas text,
  tintas_ok boolean NOT NULL DEFAULT false,
  observaciones text,
  raw_input text,
  responsable text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (order_id),
  CONSTRAINT orders_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.accounts(account_id),
  CONSTRAINT orders_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id),
  CONSTRAINT orders_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(lead_id)
);

CREATE TABLE public.order_lines (
  id bigint NOT NULL DEFAULT nextval('order_lines_id_seq'::regclass),
  order_id text NOT NULL,
  version integer NOT NULL DEFAULT 1,
  modelo text NOT NULL,
  talla text,
  cantidad integer,
  observaciones text,
  incompleta boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT order_lines_pkey PRIMARY KEY (id),
  CONSTRAINT order_lines_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id)
);

CREATE TABLE public.interactions (
  interaction_id text NOT NULL,
  lead_id text,
  account_id text,
  contact_id text,
  order_id text,
  channel text NOT NULL CHECK (channel = ANY (ARRAY['whatsapp'::text, 'email'::text, 'web'::text, 'instagram'::text, 'facebook'::text, 'phone'::text, 'other'::text])),
  direction text NOT NULL CHECK (direction = ANY (ARRAY['inbound'::text, 'outbound'::text])),
  message_id text,
  raw_text text NOT NULL,
  attachments text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT interactions_pkey PRIMARY KEY (interaction_id),
  CONSTRAINT interactions_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(lead_id),
  CONSTRAINT interactions_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.accounts(account_id),
  CONSTRAINT interactions_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contacts(contact_id),
  CONSTRAINT interactions_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id)
);

CREATE TABLE public.tasks (
  task_id text NOT NULL,
  account_id text,
  lead_id text,
  order_id text,
  title text NOT NULL,
  status text NOT NULL DEFAULT 'open'::text CHECK (status = ANY (ARRAY['open'::text, 'in_progress'::text, 'done'::text, 'blocked'::text])),
  priority text CHECK (priority = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'urgent'::text])),
  due_date date,
  assignee text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tasks_pkey PRIMARY KEY (task_id),
  CONSTRAINT tasks_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.accounts(account_id),
  CONSTRAINT tasks_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(lead_id),
  CONSTRAINT tasks_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id)
);

-- Note: document_chunks and conversaciones are excluded for Phase 1 as instructed.
