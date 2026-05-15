import type { SupabaseClient } from '@supabase/supabase-js'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProfileData {
  isComplete: boolean
  firstName: string
  lastName: string
  fullName: string
  phone: string
  avatarUrl: string
  birthDate: string
  dailyGoalCards: number
  preferredStudyTime: string
}

export interface ProfileUpdate {
  firstName: string
  lastName: string
  phone: string
  avatarUrl?: string
  birthDate?: string
  dailyGoalCards?: number
  preferredStudyTime?: string
}

// ─── Row shape ────────────────────────────────────────────────────────────────

interface ProfileRow {
  id: string
  first_name: string | null
  last_name: string | null
  full_name: string | null
  email: string
  phone: string | null
  avatar_url: string | null
  birth_date: string | null
  daily_goal_cards: number | null
  preferred_study_time: string | null
}

// ─── ensureProfile ────────────────────────────────────────────────────────────
// Creates the profile row if missing, then returns the full profile.
// Profile is considered complete when both first_name and last_name are set.

export async function ensureProfile(
  client: SupabaseClient,
  userId: string,
  email: string,
): Promise<ProfileData> {
  const empty: ProfileData = {
    isComplete: false, firstName: '', lastName: '', fullName: '',
    phone: '', avatarUrl: '', birthDate: '', dailyGoalCards: 20, preferredStudyTime: 'flexible',
  }

  await client
    .from('profiles')
    .upsert({ id: userId, email }, { onConflict: 'id', ignoreDuplicates: true })

  const { data, error } = await client
    .from('profiles')
    .select('first_name, last_name, full_name, phone, avatar_url, birth_date, daily_goal_cards, preferred_study_time')
    .eq('id', userId)
    .single<ProfileRow>()

  if (error || !data) return empty

  const firstName = data.first_name ?? ''
  const lastName = data.last_name ?? ''
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || (data.full_name ?? '')

  return {
    isComplete: firstName.trim().length > 0 && lastName.trim().length > 0,
    firstName, lastName, fullName,
    phone: data.phone ?? '',
    avatarUrl: data.avatar_url ?? '',
    birthDate: data.birth_date ?? '',
    dailyGoalCards: data.daily_goal_cards ?? 20,
    preferredStudyTime: data.preferred_study_time ?? 'flexible',
  }
}

// ─── updateProfile ────────────────────────────────────────────────────────────
// Writes editable fields to the profiles table and mirrors full_name + avatar_url
// to auth user_metadata so UI components reading user_metadata stay in sync.

export async function updateProfile(
  client: SupabaseClient,
  userId: string,
  data: ProfileUpdate,
): Promise<{ error: string | null }> {
  const fullName = [data.firstName.trim(), data.lastName.trim()].filter(Boolean).join(' ')

  const { error: profileError } = await client
    .from('profiles')
    .update({
      first_name: data.firstName.trim(),
      last_name: data.lastName.trim(),
      full_name: fullName,
      phone: data.phone.trim() || null,
      avatar_url: data.avatarUrl?.trim() || null,
      birth_date: data.birthDate?.trim() || null,
      daily_goal_cards: data.dailyGoalCards ?? 20,
      preferred_study_time: data.preferredStudyTime ?? 'flexible',
    })
    .eq('id', userId)

  if (profileError) return { error: profileError.message }

  // Mirror to auth metadata so user_metadata stays consistent without extra DB reads
  const { error: metaError } = await client.auth.updateUser({
    data: {
      full_name: fullName,
      ...(data.avatarUrl !== undefined && { avatar_url: data.avatarUrl.trim() || null }),
    },
  })

  return { error: metaError?.message ?? null }
}
