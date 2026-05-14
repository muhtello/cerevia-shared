import { Exercise } from "./exerciseType";
import { StudySettings, DEFAULT_STUDY_SETTINGS } from "./settingType";

export interface Deck {
    id: string;
    title: string;
    exercises: Exercise[];
    content?: string;
    createdAt: Date;
    updatedAt?: Date;
    /** Per-deck study settings — falls back to DEFAULT_STUDY_SETTINGS on creation */
    studySettings: StudySettings;

    // Sync metadata (client-only, not stored in Supabase columns)
    _localStatus?: 'synced' | 'created' | 'updated' | 'deleted';
}

/** Helper to create a new deck with default study settings */
export function createDeck(partial: Omit<Deck, "studySettings">): Deck {
    return { ...partial, studySettings: { ...DEFAULT_STUDY_SETTINGS } };
}
