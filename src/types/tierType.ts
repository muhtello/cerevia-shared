export type Tier = 'free' | 'pro';



export const TIER_LIMITS = {
    free: {
        maxDecks: 3,
        monthlyExercises: 30,
    },
    pro: {
        maxDecks: Infinity,
        monthlyExercises: Infinity,
    },
} as const;

type TierInfo = {
    label: string;
    description: string;
    maxDecks: number;
    monthlyExercises: number;
    features: string[];
};

export const TIER_INFO: Record<Tier, TierInfo> = {
    free: {
        label: 'Free',
        description: 'Basic learning access',
        maxDecks: TIER_LIMITS.free.maxDecks,
        monthlyExercises: TIER_LIMITS.free.monthlyExercises,
        features: [
            'QR Sync',
            'Mobile Practice',
            '3 Decks',
            '30 Exercises / Month',
        ],
    },
    pro: {
        label: 'Pro',
        description: 'Unlimited learning experience',
        maxDecks: TIER_LIMITS.pro.maxDecks,
        monthlyExercises: TIER_LIMITS.pro.monthlyExercises,
        features: [
            'Unlimited Decks',
            'Unlimited Exercises',
            'Advanced Learning Modes',
            'Priority Features',
        ],
    },
};
