// ─── Types ────────────────────────────────────────────────────────────────────

export interface SyncLog {
  decksPushed: number
  decksPulled: number
  decksConflicted: number
  exercisesPushed: number
  exercisesPulled: number
  recordsPushed: number
  recordsPulled: number
  /** Web only — 0 on mobile */
  sessionsSynced: number
  /** Web only — 0 on mobile */
  resetsSynced: number
  profileSynced: boolean
  errors: string[]
}

export interface SyncMessage {
  title: string
  /** Individual bullet points — join with ' · ' for toast, '\n' for Alert */
  lines: string[]
  kind: 'success' | 'warning' | 'error' | 'info'
}

// ─── buildSyncMessage ─────────────────────────────────────────────────────────

export function buildSyncMessage(log: SyncLog): SyncMessage {
  if (log.errors.length > 0) {
    return { title: 'Sync failed', lines: log.errors, kind: 'error' }
  }

  if (log.decksConflicted > 0) {
    const n = log.decksConflicted
    return {
      title: 'Sync conflict',
      lines: [
        `${n} deck${n > 1 ? 's were' : ' was'} updated on another device — your local changes were overridden.`,
      ],
      kind: 'warning',
    }
  }

  const lines: string[] = []

  if (log.decksPushed > 0) {
    const ex = log.exercisesPushed > 0 ? ` (${log.exercisesPushed} exercise${log.exercisesPushed > 1 ? 's' : ''})` : ''
    lines.push(`${log.decksPushed} deck${log.decksPushed > 1 ? 's' : ''} uploaded${ex}`)
  }
  if (log.decksPulled > 0) {
    const ex = log.exercisesPulled > 0 ? ` (${log.exercisesPulled} exercise${log.exercisesPulled > 1 ? 's' : ''})` : ''
    lines.push(`${log.decksPulled} deck${log.decksPulled > 1 ? 's' : ''} downloaded${ex}`)
  }
  if (log.recordsPushed > 0)
    lines.push(`${log.recordsPushed} study record${log.recordsPushed > 1 ? 's' : ''} saved`)
  if (log.recordsPulled > 0)
    lines.push(`${log.recordsPulled} study record${log.recordsPulled > 1 ? 's' : ''} received`)
  if (log.sessionsSynced > 0)
    lines.push(`${log.sessionsSynced} session result${log.sessionsSynced > 1 ? 's' : ''} logged`)
  if (log.resetsSynced > 0)
    lines.push(`${log.resetsSynced} progress reset${log.resetsSynced > 1 ? 's' : ''} applied`)
  if (log.profileSynced)
    lines.push('Profile updated')

  if (lines.length === 0) {
    return { title: 'Already up to date', lines: [], kind: 'info' }
  }

  return { title: 'Synced', lines, kind: 'success' }
}
