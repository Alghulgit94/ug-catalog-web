/* ============================================
   UG Hogar — services/supabase-client.js
   Singleton Supabase client.
   ============================================ */

(function () {
  if (window.supabaseClient) return;

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = window.APP_CONFIG;
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
})();
