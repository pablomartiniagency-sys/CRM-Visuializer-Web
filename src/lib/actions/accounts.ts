'use server';

import { createClientServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const accountSchema = z.object({
  id: z.string().optional(),
  nif: z.string().min(1, 'EI NIF es obligatorio'),
  legal_name: z.string().min(1, 'La Razón Social es obligatoria'),
  trade_name: z.string().optional(),
  client_type: z.string().optional(),
  agent: z.string().optional(),
  status: z.enum(['active', 'inactive', 'prospect']).default('active'),
  source_codes: z.string().optional(),
  notes: z.string().optional(),
});

export async function createAccount(data: z.infer<typeof accountSchema>) {
  try {
    const validated = accountSchema.parse(data);
    const supabase = await createClientServerClient();

    // The account_id should probably be generated or auto-incremented. In our schema it is text NOT NULL. 
    // We'll generate a random string ID or let UI provide it. 
    // Since UI might not provide it, we generate one:
    const account_id = validated.id || `acc_${crypto.randomUUID().replace(/-/g, '').substring(0, 10)}`;

    const { data: result, error } = await supabase.from('accounts').insert({
      account_id,
      nif: validated.nif,
      legal_name: validated.legal_name,
      trade_name: validated.trade_name,
      client_type: validated.client_type,
      agent: validated.agent,
      status: validated.status,
      source_codes: validated.source_codes,
      notes: validated.notes,
    });

    if (error) throw new Error(error.message);

    revalidatePath('/accounts');
    return { success: true, account_id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateAccount(id: string, data: z.infer<typeof accountSchema>) {
  try {
    const validated = accountSchema.parse(data);
    const supabase = await createClientServerClient();

    const { error } = await supabase
      .from('accounts')
      .update({
        nif: validated.nif,
        legal_name: validated.legal_name,
        trade_name: validated.trade_name,
        client_type: validated.client_type,
        agent: validated.agent,
        status: validated.status,
        source_codes: validated.source_codes,
        notes: validated.notes,
        updated_at: new Date().toISOString()
      })
      .eq('account_id', id);

    if (error) throw new Error(error.message);

    revalidatePath('/accounts');
    revalidatePath(`/accounts/${id}`);
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
