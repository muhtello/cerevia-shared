import { Exercise } from "./exerciseType";
import { StudySettings } from "./settingType";
export interface Deck {
    id: string;
    title: string;
    exercises: Exercise[];
    content?: string;
    createdAt: Date;
    updatedAt?: Date;
    /** Per-deck study settings — falls back to DEFAULT_STUDY_SETTINGS on creation */
    studySettings: StudySettings;
    _localStatus?: 'synced' | 'created' | 'updated' | 'deleted';
}
/** Helper to create a new deck with default study settings */
export declare function createDeck(partial: Omit<Deck, "studySettings">): Deck;
