import type { SupabaseClient } from '@supabase/supabase-js';
export declare function deleteAccount(supabase: SupabaseClient, userId: string): Promise<{
    error: string | null;
}>;
