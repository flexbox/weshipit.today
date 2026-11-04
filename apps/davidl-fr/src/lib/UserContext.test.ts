import type { User as SupabaseUser } from '@supabase/supabase-js';
import { toWorkshopUser } from '~/lib/UserContext';

jest.mock('~/lib/supabase', () => ({ supabase: null }));

describe('toWorkshopUser', () => {
  it('keeps only the email of a Supabase user', () => {
    const user = { email: 'student@example.com', id: 'uuid' } as SupabaseUser;

    expect(toWorkshopUser(user)).toEqual({ email: 'student@example.com' });
  });

  it('returns null without a user or an email', () => {
    expect(toWorkshopUser(null)).toBeNull();
    expect(toWorkshopUser(undefined)).toBeNull();
    expect(toWorkshopUser({ id: 'uuid' } as SupabaseUser)).toBeNull();
  });
});
