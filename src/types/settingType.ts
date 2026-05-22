// ─── Repeat Mode ─────────────────────────────────────────────────────────────

/**
 * How "Again"-rated cards are re-inserted within the session.
 *
 * random     — re-inserted at a random position up to `count` times
 * allCorrect — keep repeating until answered without "Again"
 * once       — exactly one retry, then removed
 * never      — not re-inserted (skipped after first Again)
 */
export type RepeatMode = "random" | "allCorrect" | "once" | "never";

export interface RepeatStrategy {
    mode: RepeatMode;
    /** Max re-insertions per card — used only by "random" mode */
    count?: number;
}

// ─── Study Settings ───────────────────────────────────────────────────────────

export interface StudySettings {
    /** Controls how Again-rated cards reappear within the same session */
    repeatSettings: RepeatStrategy;

    /**
     * Hours added to session-end time before a 2nd-time Hard card reappears.
     * Hard cards on their FIRST occurrence repeat within the same session.
     * From the SECOND occurrence onwards they are deferred by this many hours.
     */
    hardDelayHours: number;

    /**
     * Base interval in days applied when rating "Good" for the first time.
     * Consecutive "Good" answers grow by `intervalDayIncrement` each time.
     */
    goodDays: number;

    /**
     * Base interval in days applied when rating "Easy" for the first time.
     * Consecutive "Easy" answers grow by `intervalDayIncrement` each time.
     */
    easyDays: number;

    /**
     * System-defined daily increment added per consecutive same-rating answer.
     * Example (Good, goodDays=1, increment=2):
     *   1st Good → 1 day | 2nd Good → 3 days | 3rd Good → 5 days …
     * This field is NOT shown in the user settings UI.
     */
    intervalDayIncrement: number;

    /**
     * Maximum exercises included in one session.
     * 0 = include all due/new exercises (no cap).
     */
    maxCards: number;

    /**
     * How many times a "Hard"-rated card re-enters the repeat pool within
     * the same session before being deferred to hardDelayHours.
     */
    maxHardRepeats: number;

    /** When true, each card has a countdown timer; answer reveals on expiry. */
    timerEnabled: boolean;

    /** Seconds per card when timerEnabled is true. Range: 5–300. */
    timerSeconds: number;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const DEFAULT_STUDY_SETTINGS: StudySettings = {
    repeatSettings: { mode: "random", count: 3 },
    hardDelayHours: 4,
    goodDays: 1,
    easyDays: 4,
    intervalDayIncrement: 2,
    maxCards: 20,
    maxHardRepeats: 2,
    timerEnabled: false,
    timerSeconds: 30,
};
