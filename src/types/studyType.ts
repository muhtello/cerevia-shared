import type { Exercise } from "./exerciseType";

// ─── Rating ───────────────────────────────────────────────────────────────────

/**
 * The four answer-quality buttons shown to the user after each exercise.
 *
 * again — couldn't recall; repeat this session (per RepeatStrategy)
 * hard  — recalled with great difficulty; 1st time: repeat this session,
 *          2nd+ time: deferred by hardDelayHours after session ends
 * good  — recalled correctly; schedule for future review (goodDays)
 * easy  — recalled very easily; schedule for future review (easyDays)
 */
export type CardRating = "again" | "hard" | "good" | "easy";

// ─── Card Record (persisted per deck) ────────────────────────────────────────

export interface CardRecord {
    exerciseId: string;

    /** Current scheduled interval in days (used to compute next dueDate) */
    intervalDays: number;

    /** Unix timestamp (ms) — when this card is next due for review */
    dueDate: number;

    /** Unix timestamp (ms) — when this card was last reviewed (0 = never) */
    lastReviewed: number;

    /** The rating given on the most recent review */
    lastRating: CardRating | null;

    /**
     * Number of consecutive reviews with the SAME rating.
     * Resets to 0 when the rating changes.
     */
    consecutiveSameRating: number;
}

// ─── Session Queue Item (ephemeral) ──────────────────────────────────────────

export interface QueueItem {
    exercise: Exercise;

    /** How many times this card has been re-inserted via "Again" this session */
    againCount: number;

    /**
     * How many times this card has been rated "Hard" this session.
     * 0 → first encounter | 1 → already had one Hard repeat, next Hard defers
     */
    hardCount: number;
}

// ─── Session Stats (ephemeral) ───────────────────────────────────────────────

export interface SessionStats {
    /** Number of exercises in the initial pool (before any repeats) */
    total: number;
    again: number;
    hard: number;
    good: number;
    easy: number;
    skipped: number;
    avgResponseTime: number;
    startTime: number;
    endTime?: number;
}

// ─── Attempt Log (ephemeral) ─────────────────────────────────────────────────

export interface AttemptLog {
    exerciseId: string;
    rating: CardRating;
    responseTime: number; // ms
    timestamp: number;
}

// ─── Record Reset (persisted until synced) ───────────────────────────────────

/** Captures a "reset progress" event so the sync can delete server records */
export interface RecordReset {
    deckId: string;
    /** IDs of every exercise in the deck at reset time */
    exerciseIds: string[];
    /** Unix ms — when resetDeckRecords() was called */
    resetAt: number;
}

// ─── Session Log (persisted until synced) ────────────────────────────────────

export interface SessionLog {
    /** Client-generated UUID, used to deduplicate on the server */
    id: string;
    deckId: string;
    stats: SessionStats;
    attempts: AttemptLog[];
    /** Unix ms — when endSession() was called */
    savedAt: number;
}
