import type { SupabaseClient } from '@supabase/supabase-js';
import type { SessionLog } from '../../types/studyType';
export declare function syncSessionHistory(client: SupabaseClient, localSessions: SessionLog[], userId: string): Promise<{
    pulledSessions: SessionLog[];
    syncedIds: string[];
    error: string | null;
}>;
