import type { SupabaseClient } from '@supabase/supabase-js';
import type { Deck } from '../../types/deckType';
export declare function syncDecks(client: SupabaseClient, localDecks: Deck[], pendingDeletes: string[], userId: string): Promise<{
    mergedDecks: Deck[];
    error: string | null;
    pushedCount: number;
    pulledCount: number;
    conflictCount: number;
    exercisesPushed: number;
    exercisesPulled: number;
}>;
