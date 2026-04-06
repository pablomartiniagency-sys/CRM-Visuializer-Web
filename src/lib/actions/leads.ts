'use strict';
'use server';

import { createClientServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateLeadStatus(lead_id: string, new_status: string) {
  try {
    const supabase = await createClientServerClient();
    const { error } = await supabase
      .from('leads')
      .update({ status: new_status, updated_at: new Date().toISOString() })
      .eq('lead_id', lead_id);

    if (error) throw new Error(error.message);

    revalidatePath('/leads');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
