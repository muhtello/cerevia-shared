"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = deleteAccount;
// REQUIRED — run the SQL below once in your Supabase SQL editor:
//
// CREATE OR REPLACE FUNCTION public.delete_user_account()
// RETURNS json LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth AS $$
// DECLARE uid uuid := auth.uid(); BEGIN
//   IF uid IS NULL THEN RETURN json_build_object('error', 'Not authenticated'); END IF;
//   DELETE FROM card_records   WHERE user_id  = uid;
//   DELETE FROM study_settings WHERE deck_id  IN (SELECT id FROM decks WHERE owner_id = uid);
//   DELETE FROM exercises      WHERE deck_id  IN (SELECT id FROM decks WHERE owner_id = uid);
//   DELETE FROM decks          WHERE owner_id = uid;
//   DELETE FROM user_tiers     WHERE user_id  = uid;
//   DELETE FROM profiles       WHERE id       = uid;
//   DELETE FROM auth.users     WHERE id       = uid;
//   RETURN json_build_object('error', null::text);
// END; $$;
async function deleteAccount(supabase, userId) {
    var _a;
    // Remove avatar file — best-effort, don't fail if it's missing
    await supabase.storage.from('avatars').remove([`${userId}/avatar.jpg`]);
    const { data, error } = await supabase.rpc('delete_user_account');
    if (error)
        return { error: error.message };
    return { error: (_a = data === null || data === void 0 ? void 0 : data.error) !== null && _a !== void 0 ? _a : null };
}
