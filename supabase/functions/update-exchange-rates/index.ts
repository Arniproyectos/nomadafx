import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// ExchangeRate-API free endpoint (no API key required)
const EXCHANGE_RATE_API_URL = "https://open.er-api.com/v6/latest/USD";

interface ExchangeRateResponse {
  result: string;
  base_code: string;
  rates: Record<string, number>;
}

interface CountryRecord {
  id: string;
  code: string;
  currency: string;
  devaluation_vs_usd: number;
}

// Map country codes to their currency codes
const countryCurrencyMap: Record<string, string> = {
  AR: "ARS", // Argentina
  VE: "VES", // Venezuela
  TR: "TRY", // Turkey
  LB: "LBP", // Lebanon
  LK: "LKR", // Sri Lanka
  PK: "PKR", // Pakistan
  EG: "EGP", // Egypt
  NG: "NGN", // Nigeria
  KE: "KES", // Kenya
  GH: "GHS", // Ghana
  ZA: "ZAR", // South Africa
  IN: "INR", // India
  ID: "IDR", // Indonesia
  TH: "THB", // Thailand
  VN: "VND", // Vietnam
  PH: "PHP", // Philippines
  MY: "MYR", // Malaysia
  MX: "MXN", // Mexico
  CO: "COP", // Colombia
  PE: "PEN", // Peru
  CL: "CLP", // Chile
  BR: "BRL", // Brazil
  PL: "PLN", // Poland
  HU: "HUF", // Hungary
  CZ: "CZK", // Czech Republic
  RO: "RON", // Romania
  BG: "BGN", // Bulgaria
  RS: "RSD", // Serbia
  UA: "UAH", // Ukraine
  GE: "GEL", // Georgia
  AM: "AMD", // Armenia
  MA: "MAD", // Morocco
  TN: "TND", // Tunisia
  JO: "JOD", // Jordan
  NP: "NPR", // Nepal
  BD: "BDT", // Bangladesh
  KH: "KHR", // Cambodia
  MM: "MMK", // Myanmar
};

// Store previous rates for calculating devaluation
// In production, you'd fetch these from a historical table
const baselineRates: Record<string, number> = {
  ARS: 350, // Baseline from ~1 year ago
  VES: 24,
  TRY: 19,
  LBP: 15000,
  LKR: 320,
  PKR: 230,
  EGP: 24,
  NGN: 460,
  KES: 130,
  GHS: 10,
  ZAR: 17,
  INR: 82,
  IDR: 15000,
  THB: 34,
  VND: 23500,
  PHP: 55,
  MYR: 4.4,
  MXN: 18,
  COP: 4200,
  PEN: 3.8,
  CLP: 850,
  BRL: 5.0,
  PLN: 4.2,
  HUF: 350,
  CZK: 22,
  RON: 4.5,
  BGN: 1.8,
  RSD: 108,
  UAH: 37,
  GEL: 2.6,
  AMD: 390,
  MAD: 10,
  TND: 3.1,
  JOD: 0.71,
  NPR: 130,
  BDT: 107,
  KHR: 4100,
  MMK: 2100,
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch current exchange rates from ExchangeRate-API
    console.log("Fetching exchange rates from API...");
    const ratesResponse = await fetch(EXCHANGE_RATE_API_URL);
    
    if (!ratesResponse.ok) {
      throw new Error(`Failed to fetch exchange rates: ${ratesResponse.status}`);
    }

    const ratesData: ExchangeRateResponse = await ratesResponse.json();
    
    if (ratesData.result !== "success") {
      throw new Error("Exchange rate API returned error");
    }

    console.log("Successfully fetched exchange rates");

    // Get all countries from database
    const { data: countries, error: countriesError } = await supabase
      .from("countries")
      .select("id, code, currency, devaluation_vs_usd");

    if (countriesError) {
      throw new Error(`Failed to fetch countries: ${countriesError.message}`);
    }

    const updates: { id: string; devaluation: number; currentRate: number }[] = [];
    const currentMonth = new Date().toLocaleString("es-ES", { month: "short" });
    const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

    // Calculate devaluation for each country
    for (const country of countries as CountryRecord[]) {
      const currencyCode = countryCurrencyMap[country.code];
      
      if (!currencyCode || !ratesData.rates[currencyCode]) {
        console.log(`No rate found for ${country.code} (${currencyCode})`);
        continue;
      }

      const currentRate = ratesData.rates[currencyCode];
      const baselineRate = baselineRates[currencyCode];

      if (!baselineRate) {
        console.log(`No baseline rate for ${currencyCode}`);
        continue;
      }

      // Calculate YoY devaluation percentage
      // Positive value means currency lost value against USD
      const devaluation = ((currentRate - baselineRate) / baselineRate) * 100;
      
      updates.push({
        id: country.id,
        devaluation: Math.round(devaluation * 10) / 10, // Round to 1 decimal
        currentRate,
      });
    }

    console.log(`Updating ${updates.length} countries...`);

    // Update countries with new devaluation values
    for (const update of updates) {
      const { error: updateError } = await supabase
        .from("countries")
        .update({ 
          devaluation_vs_usd: update.devaluation,
          updated_at: new Date().toISOString()
        })
        .eq("id", update.id);

      if (updateError) {
        console.error(`Failed to update country ${update.id}: ${updateError.message}`);
      }

      // Insert historical record
      const { error: historyError } = await supabase
        .from("exchange_rate_history")
        .upsert({
          country_id: update.id,
          month: capitalizedMonth,
          rate: update.currentRate,
          recorded_at: new Date().toISOString(),
        }, {
          onConflict: "country_id,month",
          ignoreDuplicates: false,
        });

      if (historyError) {
        console.error(`Failed to insert history for ${update.id}: ${historyError.message}`);
      }
    }

    const result = {
      success: true,
      updatedAt: new Date().toISOString(),
      countriesUpdated: updates.length,
      rates: updates.map((u) => ({
        id: u.id,
        devaluation: u.devaluation,
        rate: u.currentRate,
      })),
    };

    console.log("Update complete:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error updating exchange rates:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
