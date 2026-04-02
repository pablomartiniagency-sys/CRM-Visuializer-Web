import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ftylgboxrtazosabttlz.supabase.co'
const supabaseKey = 'sb_publishable_wO4SOlZzBw_vW1o72mb98A_CM39fSQD'
const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  console.log("Testing connection...");
  for (const table of ['tasks', 'interactions']) {
    const { data, error } = await supabase.from(table).select('*').limit(1)
    if (error) {
      console.error(`Error querying ${table}:`, error.message);
    } else {
      console.log(`Table ${table} sample:`, data[0]);
    }
  }
}
test();
