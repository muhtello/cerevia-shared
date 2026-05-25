export interface FieldHelp {
    label: string;
    description: string;
}
export interface ExerciseTypeHelp {
    summary: string;
    fields: FieldHelp[];
}
export declare const EXERCISE_HELP: Record<string, ExerciseTypeHelp>;
