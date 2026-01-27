-- Create enum for continent
CREATE TYPE public.continent_type AS ENUM ('america', 'europe', 'asia', 'africa', 'oceania');

-- Create enum for risk level
CREATE TYPE public.risk_level_type AS ENUM ('low', 'medium', 'high');

-- Create enum for trend
CREATE TYPE public.trend_type AS ENUM ('up', 'down', 'stable');

-- Create countries table
CREATE TABLE public.countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(3) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  currency VARCHAR(100) NOT NULL,
  flag VARCHAR(10) NOT NULL,
  continent continent_type NOT NULL,
  devaluation_vs_usd DECIMAL(6,2) NOT NULL DEFAULT 0,
  big_mac_index DECIMAL(5,2) NOT NULL DEFAULT 0,
  monthly_living_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  rent_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  food_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  transport_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  entertainment_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  risk_level risk_level_type NOT NULL DEFAULT 'medium',
  trend trend_type NOT NULL DEFAULT 'stable',
  highlights TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create historical data table for exchange rate trends
CREATE TABLE public.exchange_rate_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  month VARCHAR(10) NOT NULL,
  rate DECIMAL(15,4) NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(country_id, month)
);

-- Create reference countries table (for comparison/origin)
CREATE TABLE public.reference_countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(3) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  currency VARCHAR(100) NOT NULL,
  flag VARCHAR(10) NOT NULL,
  avg_monthly_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (public read access)
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exchange_rate_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reference_countries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (these are reference data, not user data)
CREATE POLICY "Countries are publicly readable"
  ON public.countries
  FOR SELECT
  USING (true);

CREATE POLICY "Exchange rate history is publicly readable"
  ON public.exchange_rate_history
  FOR SELECT
  USING (true);

CREATE POLICY "Reference countries are publicly readable"
  ON public.reference_countries
  FOR SELECT
  USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_countries_updated_at
  BEFORE UPDATE ON public.countries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_countries_continent ON public.countries(continent);
CREATE INDEX idx_countries_devaluation ON public.countries(devaluation_vs_usd);
CREATE INDEX idx_exchange_history_country ON public.exchange_rate_history(country_id);