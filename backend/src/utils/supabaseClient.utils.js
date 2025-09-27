import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.SUPABASE_URL;

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if(!supabaseURL || !supabaseServiceKey){
    throw new Error("Supabase URL and Service Key are required");
}

export const supabase = createClient(supabaseURL, supabaseServiceKey);
