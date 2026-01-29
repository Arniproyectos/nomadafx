-- Add unique constraint for upsert on exchange_rate_history
ALTER TABLE public.exchange_rate_history 
ADD CONSTRAINT exchange_rate_history_country_month_unique 
UNIQUE (country_id, month);

-- Enable pg_cron and pg_net extensions for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;