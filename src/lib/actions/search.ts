'use server';

import { createClientServerClient } from '@/lib/supabase/server';
import { MOCK_TASKS, MOCK_LEADS, USE_MOCK } from '@/lib/mockData';

export async function getGlobalSearchResults(query: string) {
  if (USE_MOCK || !query) {
    const q = query.toLowerCase();
    const tasks = MOCK_TASKS.filter(t => t.title.toLowerCase().includes(q));
    const leads = MOCK_LEADS.filter(l => l.message_summary.toLowerCase().includes(q) || l.accounts?.legal_name.toLowerCase().includes(q));
    return {
      tasks: tasks.slice(0, 5),
      leads: leads.slice(0, 5)
    };
  }

  const supabase = await createClientServerClient();
  
  // Search tasks
  const { data: tasks } = await supabase
    .from('tasks')
    .select('task_id, title')
    .ilike('title', `%${query}%`)
    .limit(5);

  // Search accounts
  const { data: accounts } = await supabase
    .from('accounts')
    .select('account_id, legal_name')
    .ilike('legal_name', `%${query}%`)
    .limit(5);

  return {
    tasks: tasks || [],
    accounts: accounts || []
  };
}
