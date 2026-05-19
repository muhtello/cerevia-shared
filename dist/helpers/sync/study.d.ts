import type { SupabaseClient } from '@supabase/supabase-js';
import type { CardRecord } from '../../types/studyType';
export declare function syncStudyData(client: SupabaseClient, localCardRecords: Record<string, Record<string, CardRecord>>, userId: string, pendingResetExerciseIds?: string[]): Promise<{
    mergedFlatRecords: Record<string, CardRecord>;
    error: string | null;
    pushedCount: number;
    pulledCount: number;
}>;
