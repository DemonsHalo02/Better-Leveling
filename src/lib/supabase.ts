// Supabase Client and Multi-device Sync Helper
// Supports both build-time environment variables and runtime user credentials stored in localStorage

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY_URL = 'better_leveling_supabase_url';
const STORAGE_KEY_ANON = 'better_leveling_supabase_anon';

export function sanitizeSupabaseUrl(url: string): string {
  let clean = url.trim();
  // Strip trailing slashes
  clean = clean.replace(/\/+$/, '');
  // Strip /rest/v1 if user copied the REST API endpoint
  clean = clean.replace(/\/rest\/v1\/?$/, '');
  // Strip trailing slash again
  clean = clean.replace(/\/+$/, '');
  return clean;
}

export function getSavedCredentials(): { url: string; anonKey: string } {
  const meta = import.meta as unknown as { env?: Record<string, string> };
  const envUrl = meta.env?.VITE_SUPABASE_URL || '';
  const envKey = meta.env?.VITE_SUPABASE_ANON_KEY || '';

  const localUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_URL) || '' : '';
  const localKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_ANON) || '' : '';

  const rawUrl = localUrl || envUrl;
  return {
    url: rawUrl ? sanitizeSupabaseUrl(rawUrl) : '',
    anonKey: (localKey || envKey).trim(),
  };
}

export function saveCredentials(url: string, anonKey: string): void {
  const cleanUrl = sanitizeSupabaseUrl(url);
  const cleanKey = anonKey.trim();

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_URL, cleanUrl);
    localStorage.setItem(STORAGE_KEY_ANON, cleanKey);
  }
  // Reinitialize client
  initSupabaseClient();
}

export function clearCredentials(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_URL);
    localStorage.removeItem(STORAGE_KEY_ANON);
  }
  cachedClient = null;
}

let cachedClient: SupabaseClient | null = null;

export function initSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getSavedCredentials();

  if (!url || !anonKey || !url.startsWith('https://')) {
    cachedClient = null;
    return null;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    cachedClient = null;
    return null;
  }
}

export function getSupabase(): SupabaseClient | null {
  if (!cachedClient) {
    cachedClient = initSupabaseClient();
  }
  return cachedClient;
}

/**
 * Validates connection to the Supabase instance
 */
export async function testSupabaseConnection(url: string, anonKey: string): Promise<{ success: boolean; message: string }> {
  try {
    const cleanUrl = sanitizeSupabaseUrl(url);
    const cleanKey = anonKey.trim();

    if (!cleanUrl.startsWith('https://')) {
      return { success: false, message: 'URL must begin with https://' };
    }
    const client = createClient(cleanUrl, cleanKey);
    const { error } = await client.from('profiles').select('id').limit(1);

    // If table doesn't exist yet, it's still a reachable Supabase server (PostgREST code 42P01)
    if (error && error.code !== '42P01' && !error.message.includes('relation "profiles" does not exist')) {
      // If error is invalid API key
      if (error.code === 'PGRST301' || error.message.includes('JWT')) {
        return { success: false, message: 'Invalid Supabase Anon/Public Key.' };
      }
    }

    return { success: true, message: 'Successfully connected to Supabase.' };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown connection error';
    return { success: false, message: errorMsg };
  }
}
