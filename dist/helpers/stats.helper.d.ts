import type { Exercise } from "../types/exerciseType";
import type { CardRecord } from "../types/studyType";
import type { Deck } from "../types/deckType";
import type { DeckStats, ExerciseStats } from "../types/statsType";
/**
 * Returns stats for a single exercise given its persisted CardRecord.
 * Pass `undefined` for record if the exercise has never been reviewed.
 */
export declare function getExerciseStats(exercise: Exercise, record: CardRecord | undefined): ExerciseStats;
/**
 * Aggregates per-exercise stats into a single DeckStats object.
 *
 * @param deck        - The deck to summarise
 * @param deckRecords - exerciseId → CardRecord map for this deck (from studyStore)
 */
export declare function getDeckStats(deck: Deck, deckRecords: Record<string, CardRecord>): DeckStats;
