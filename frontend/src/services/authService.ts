import type { UserProfile } from '../types'

const mockUser: UserProfile = {
  id: 'local-traveler',
  displayName: 'Traveler',
  email: 'hello@tripora.app',
}

/**
 * Auth access layer. Returns a local placeholder profile.
 * Swap with real session calls when authentication is wired.
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  return mockUser
}

export async function signOut(): Promise<void> {
  return undefined
}
