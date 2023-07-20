import { Database } from '@/types/db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';


export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
);

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getFilaments() {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.from('filaments').select('*');
    return { data: data ?? [], error };
}