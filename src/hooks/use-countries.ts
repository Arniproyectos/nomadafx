import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CountryData {
  id: string;
  code: string;
  name: string;
  currency: string;
  flag: string;
  continent: 'america' | 'europe' | 'asia' | 'africa' | 'oceania';
  devaluationVsUSD: number;
  bigMacIndex: number;
  monthlyLivingCost: number;
  rentCost: number;
  foodCost: number;
  transportCost: number;
  entertainmentCost: number;
  riskLevel: 'low' | 'medium' | 'high';
  trend: 'up' | 'down' | 'stable';
  highlights: string[];
  historicalData: { month: string; rate: number }[];
}

export interface ReferenceCountry {
  id: string;
  code: string;
  name: string;
  currency: string;
  flag: string;
  avgMonthlyCost: number;
}

// Fetch all countries with their historical data
export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async (): Promise<CountryData[]> => {
      // Fetch countries
      const { data: countries, error: countriesError } = await supabase
        .from("countries")
        .select("*")
        .order("devaluation_vs_usd", { ascending: true });

      if (countriesError) throw countriesError;

      // Fetch historical data for all countries
      const { data: history, error: historyError } = await supabase
        .from("exchange_rate_history")
        .select("country_id, month, rate")
        .order("recorded_at", { ascending: true });

      if (historyError) throw historyError;

      // Group historical data by country
      const historyByCountry = (history || []).reduce((acc, item) => {
        if (!acc[item.country_id]) {
          acc[item.country_id] = [];
        }
        acc[item.country_id].push({ month: item.month, rate: Number(item.rate) });
        return acc;
      }, {} as Record<string, { month: string; rate: number }[]>);

      // Map to our interface
      return (countries || []).map((country) => ({
        id: country.id,
        code: country.code,
        name: country.name,
        currency: country.currency,
        flag: country.flag,
        continent: country.continent as CountryData["continent"],
        devaluationVsUSD: Number(country.devaluation_vs_usd),
        bigMacIndex: Number(country.big_mac_index),
        monthlyLivingCost: Number(country.monthly_living_cost),
        rentCost: Number(country.rent_cost),
        foodCost: Number(country.food_cost),
        transportCost: Number(country.transport_cost),
        entertainmentCost: Number(country.entertainment_cost),
        riskLevel: country.risk_level as CountryData["riskLevel"],
        trend: country.trend as CountryData["trend"],
        highlights: country.highlights || [],
        historicalData: historyByCountry[country.id] || [
          { month: "Ene", rate: 100 },
          { month: "Feb", rate: 102 },
          { month: "Mar", rate: 105 },
          { month: "Abr", rate: 108 },
          { month: "May", rate: 110 },
          { month: "Jun", rate: 112 },
        ],
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Fetch reference countries
export const useReferenceCountries = () => {
  return useQuery({
    queryKey: ["reference-countries"],
    queryFn: async (): Promise<ReferenceCountry[]> => {
      const { data, error } = await supabase
        .from("reference_countries")
        .select("*")
        .order("name");

      if (error) throw error;

      return (data || []).map((country) => ({
        id: country.id,
        code: country.code,
        name: country.name,
        currency: country.currency,
        flag: country.flag,
        avgMonthlyCost: Number(country.avg_monthly_cost),
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Sort by opportunity score
export const sortByOpportunity = (countries: CountryData[]): CountryData[] => {
  return [...countries].sort((a, b) => {
    const scoreA = Math.abs(a.devaluationVsUSD) * 0.5 + (1000 - a.monthlyLivingCost) * 0.05;
    const scoreB = Math.abs(b.devaluationVsUSD) * 0.5 + (1000 - b.monthlyLivingCost) * 0.05;
    return scoreB - scoreA;
  });
};
