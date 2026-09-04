/* ============================================
   UG Hogar — config/env.js
   Single source of truth for all config values.
   No logic, no functions.
   ============================================ */

window.APP_CONFIG = Object.freeze({
  SUPABASE_URL: "https://rhmftqiwfvqjlhqqqbks.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJobWZ0cWl3ZnZxamxocXFxYmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5ODQ0MjEsImV4cCI6MjA5OTU2MDQyMX0.o_Uku0YrPzRpkJ2J0hXn1hCuLXVl9jzAfrap2zrRf2I",
  CLOUDINARY_CLOUD_NAME: "dgxwduhdc",
  CLOUDINARY_BASE_FOLDER: "catalog",
  SITE_URL: "https://www.ughogar.com", // Public site origin, e.g. "https://ughogar.com.py". Empty = derived from the current page
  WHATSAPP_PHONE: "595985288964",
  BUSINESS_NAME: "UG Hogar",
  PLACEHOLDER_IMAGE_URL: "https://placehold.co/800x600/f0eeea/9ca3af?text=UG+Hogar"
});
