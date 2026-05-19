export interface SyncLog {
    decksPushed: number;
    decksPulled: number;
    decksConflicted: number;
    exercisesPushed: number;
    exercisesPulled: number;
    recordsPushed: number;
    recordsPulled: number;
    /** Web only — 0 on mobile */
    sessionsSynced: number;
    /** Web only — 0 on mobile */
    resetsSynced: number;
    profileSynced: boolean;
    errors: string[];
}
export interface SyncMessage {
    title: string;
    /** Individual bullet points — join with ' · ' for toast, '\n' for Alert */
    lines: string[];
    kind: 'success' | 'warning' | 'error' | 'info';
}
export declare function buildSyncMessage(log: SyncLog): SyncMessage;
