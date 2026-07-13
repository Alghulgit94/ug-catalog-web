/* ============================================
   UG Hogar — services/supabase-service.js
   Centralized error handling for Supabase queries.
   ============================================ */

(function () {
  async function query(builderFn) {
    try {
      const { data, error } = await builderFn(window.supabaseClient);
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  }

  async function queryOne(builderFn) {
    try {
      const { data, error } = await builderFn(window.supabaseClient).single();
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  }

  window.supabaseService = { query, queryOne };
})();
