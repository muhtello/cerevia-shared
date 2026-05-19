"use strict";
// ─── Repeat Mode ─────────────────────────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_STUDY_SETTINGS = void 0;
// ─── Defaults ─────────────────────────────────────────────────────────────────
exports.DEFAULT_STUDY_SETTINGS = {
    repeatSettings: { mode: "random", count: 3 },
    hardDelayHours: 4,
    goodDays: 1,
    easyDays: 4,
    intervalDayIncrement: 2,
    maxCards: 20,
    maxHardRepeats: 2,
};
