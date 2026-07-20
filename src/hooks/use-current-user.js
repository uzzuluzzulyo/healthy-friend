import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { getCurrentUserId } from '../lib/auth.js';

/**
 * useCurrentUser 훅
 *
 * 로그인된 사용자의 hf_users 레코드를 가져온다.
 *
 * Example usage:
 * const { user, loading } = useCurrentUser();
 */
export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = getCurrentUserId();
    if (!userId) {
      setLoading(false);
      return;
    }

    supabase
      .from('hf_users')
      .select('id, nickname, email, birth_date, created_at')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data }) => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  return { user, loading };
}
