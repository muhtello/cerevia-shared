import type { SupabaseClient } from '@supabase/supabase-js'
import type { SessionLog, SessionStats, AttemptLog } from '../../types/studyType'

// ─── DB row shape ─────────────────────────────────────────────────────────────

interface SessionLogRow {
  id: string
  deck_id: string | null
  stats: SessionStats
  attempts: AttemptLog[]
  saved_at: string
}

function rowToSessionLog(row: SessionLogRow): SessionLog {
  return {
    id: row.id,
    deckId: row.deck_id ?? '',
    stats: row.stats,
    attempts: row.attempts,
    savedAt: new Date(row.saved_at).getTime(),
  }
}

// ─── syncSessionHistory ───────────────────────────────────────────────────────
//
// Bidirectional sync for the `session_logs` table (authenticated users only).
//
// Steps:
//   1. Pull  — fetch all session_logs for userId (newest 100, ordered desc)
//   2. Push  — insert local sessions whose id is not yet on the server
//
// Returns `pulledSessions` (full server history) so the caller can merge it
// into their local `sessionHistory` store (deduplication by id).
// Calling this multiple times is safe — already-pushed ids are skipped.

export async function syncSessionHistory(
  client: SupabaseClient,
  localSessions: SessionLog[],
  userId: string,
): Promise<{ pulledSessions: SessionLog[]; syncedIds: string[]; error: string | null }> {

  // ── 1. Pull ──────────────────────────────────────────────────────────────────
  const { data: serverRows, error: pullError } = await client
    .from('session_logs')
    .select('id,deck_id,stats,attempts,saved_at')
    .eq('user_id', userId)
    .order('saved_at', { ascending: false })
    .limit(100)

  if (pullError) {
    return { pulledSessions: [], syncedIds: [], error: pullError.message }
  }

  const serverIds = new Set((serverRows ?? []).map((r: { id: string }) => r.id))

  // ── 2. Push sessions the server hasn't seen yet ───────────────────────────────
  const syncedIds: string[] = []

  for (const session of localSessions.filter(s => !serverIds.has(s.id))) {
    const { error } = await client.from('session_logs').insert({
      id:               session.id,
      user_id:          userId,
      guest_session_id: null,
      deck_id:          session.deckId || null,
      stats:            session.stats,
      attempts:         session.attempts,
      saved_at:         new Date(session.savedAt).toISOString(),
    })
    if (!error) syncedIds.push(session.id)
  }

  const pulledSessions = (serverRows as SessionLogRow[]).map(rowToSessionLog)
  return { pulledSessions, syncedIds, error: null }
}
