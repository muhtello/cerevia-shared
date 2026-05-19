"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeck = createDeck;
const settingType_1 = require("./settingType");
/** Helper to create a new deck with default study settings */
function createDeck(partial) {
    return Object.assign(Object.assign({}, partial), { studySettings: Object.assign({}, settingType_1.DEFAULT_STUDY_SETTINGS) });
}
