import { createClient } from '@supabase/supabase-js';

// Replace 'YOUR_API_KEY' and 'YOUR_PROJECT_URL' with your actual API key and project URL
const supabase = createClient(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_SECRET);

export default supabase;
