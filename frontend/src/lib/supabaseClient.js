import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pwsyvexroaqldurdokmo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_joZ8f3TBGyhK0DCqDWKcVg_o2PFLAzq';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
