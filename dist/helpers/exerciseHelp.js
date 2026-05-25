"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXERCISE_HELP = void 0;
exports.EXERCISE_HELP = {
    flashcard: {
        summary: 'A two-sided card. The front shows the question — flip to reveal the answer on the back.',
        fields: [
            {
                label: 'Question',
                description: 'The prompt shown on the front of the card. One focused concept per card works best.',
            },
            {
                label: 'Answer',
                description: 'Shown on the back after flipping. Can be a single word, phrase, or a full explanation.',
            },
            {
                label: 'Source Text',
                description: 'The original passage this card was drawn from — optional, but provides context during review.',
            },
        ],
    },
    'fill-in-the-blank': {
        summary: 'A sentence with one or more hidden words. The learner types the missing word(s) to complete it.',
        fields: [
            {
                label: 'Sentence',
                description: 'Write the sentence and place __ (two underscores) wherever a word should be hidden. Each __ creates one blank slot.',
            },
            {
                label: 'Blank answers',
                description: 'The correct word for each __ in order. Answer fields appear automatically as you add blanks.',
            },
            {
                label: 'Explanation',
                description: 'Optional note shown after the learner answers — great for grammar rules or extra context.',
            },
            {
                label: 'Source Text',
                description: 'The original passage this sentence was taken from.',
            },
        ],
    },
    'word-pick': {
        summary: 'Like fill-in-the-blank, but the learner taps word chips instead of typing.',
        fields: [
            {
                label: 'Sentence',
                description: 'Write with __ for each blank — same format as fill-in-the-blank.',
            },
            {
                label: 'Correct words',
                description: 'The right answer(s) for each blank slot, in order.',
            },
            {
                label: 'Distractors',
                description: 'Wrong word chips added to the chip pool to raise the difficulty.',
            },
            {
                label: 'Explanation',
                description: 'Shown after submitting — use it to explain why the correct answer is right.',
            },
            {
                label: 'Source Text',
                description: 'Optional: the original passage the sentence came from.',
            },
        ],
    },
    mcq: {
        summary: 'A question with multiple answer choices. One or more options can be marked as correct.',
        fields: [
            {
                label: 'Question',
                description: '"Which of the following…" or "What best describes…" are good formats to start with.',
            },
            {
                label: 'Options',
                description: 'Add 2–6 choices. Tick the checkbox next to every correct answer — multiple correct options are supported.',
            },
            {
                label: 'Explanation',
                description: 'Shown after submitting — explain why the correct option(s) are right.',
            },
            {
                label: 'Source Text',
                description: 'The passage being tested. Helpful for reference and AI-assisted generation.',
            },
        ],
    },
    'order-sentence': {
        summary: 'The learner arranges scrambled word chips into the correct sentence order.',
        fields: [
            {
                label: 'Question / Prompt',
                description: 'Optional instruction shown above the chips, e.g. "Put these words in the correct order".',
            },
            {
                label: 'Sentence',
                description: 'The full correct sentence. It will be split into individual word chips and shuffled for the learner.',
            },
            {
                label: 'Explanation',
                description: 'Shown after submitting — useful for explaining word order or grammar rules.',
            },
            {
                label: 'Source Text',
                description: 'The original passage this sentence is from.',
            },
        ],
    },
};
