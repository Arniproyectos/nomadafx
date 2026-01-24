import { useState, useMemo } from "react";
import { Calculator, ArrowRight, DollarSign, Home, Utensils, Car, PartyPopper } from "lucide-react";
import { countriesData, referenceCountries, CountryData, ReferenceCountry } from "@/lib/countryData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CostCalculator = () => {
  const [originCountry, setOriginCountry] = useState<ReferenceCountry>(referenceCountries[0]);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(2500);
  const [selectedDestination, setSelectedDestination] = useState<CountryData | null>(null);

  const calculations = useMemo(() => {
    return countriesData.map(country => {
      const monthsAffordable = Math.floor(monthlyBudget / country.monthlyLivingCost);
      const savingsPerMonth = monthlyBudget - country.monthlyLivingCost;
      const purchasingPowerMultiplier = monthlyBudget / country.monthlyLivingCost;
      
      return {
        ...country,
        monthsAffordable,
        savingsPerMonth,
        purchasingPowerMultiplier,
      };
    }).sort((a, b) => b.purchasingPowerMultiplier - a.purchasingPowerMultiplier);
  }, [monthlyBudget]);

  const selectedCalc = selectedDestination 
    ? calculations.find(c => c.id === selectedDestination.id) 
    : calculations[0];

  return (
    <section id="calculator" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium mb-3">
            <Calculator className="w-4 h-4" />
            Calculadora interactiva
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            ¿Cuánto rinde tu dinero?
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Compara tu presupuesto mensual contra el costo de vida en diferentes destinos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Input Section */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
              <h3 className="font-display font-semibold text-lg mb-4">Tu situación actual</h3>
              
              {/* Origin Country */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  País de origen
                </label>
                <select
                  value={originCountry.id}
                  onChange={(e) => setOriginCountry(referenceCountries.find(c => c.id === e.target.value) || referenceCountries[0])}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {referenceCountries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.flag} {country.name} ({country.currency})
                    </option>
                  ))}
                </select>
              </div>

              {/* Monthly Budget */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Presupuesto mensual (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="number"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                    min={500}
                    max={20000}
                    step={100}
                    className="w-full bg-background border border-border rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <input
                  type="range"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  min={500}
                  max={10000}
                  step={100}
                  className="w-full mt-3 accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$500</span>
                  <span>$10,000</span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-2">
                {[1000, 2000, 3000, 5000].map((amount) => (
                  <Button
                    key={amount}
                    variant={monthlyBudget === amount ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMonthlyBudget(amount)}
                    className={monthlyBudget === amount ? "bg-gradient-primary" : ""}
                  >
                    ${amount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>

            {/* Top Destinations */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
              <h3 className="font-display font-semibold text-lg mb-4">Mejores destinos para tu presupuesto</h3>
              
              <div className="space-y-3">
                {calculations.slice(0, 5).map((calc, index) => (
                  <button
                    key={calc.id}
                    onClick={() => setSelectedDestination(calc)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left",
                      selectedCalc?.id === calc.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-2xl">{calc.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{calc.name}</div>
                      <div className="text-xs text-muted-foreground">
                        ${calc.monthlyLivingCost}/mes
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gain font-bold">{calc.purchasingPowerMultiplier.toFixed(1)}x</div>
                      <div className="text-xs text-muted-foreground">poder</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Results */}
          {selectedCalc && (
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-medium">
              {/* Header */}
              <div className="bg-gradient-primary p-6 text-primary-foreground">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{selectedCalc.flag}</span>
                  <div>
                    <h3 className="text-2xl font-display font-bold">{selectedCalc.name}</h3>
                    <p className="text-primary-foreground/80">{selectedCalc.highlights.join(" • ")}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-foreground/10 rounded-lg p-3">
                    <div className="text-3xl font-bold">{selectedCalc.purchasingPowerMultiplier.toFixed(1)}x</div>
                    <div className="text-sm text-primary-foreground/80">Poder adquisitivo</div>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-lg p-3">
                    <div className="text-3xl font-bold">${selectedCalc.savingsPerMonth}</div>
                    <div className="text-sm text-primary-foreground/80">Ahorras/mes</div>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="p-6">
                <h4 className="font-display font-semibold mb-4">Desglose de costos mensuales</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Home className="w-5 h-5 text-primary" />
                      <span>Alquiler</span>
                    </div>
                    <span className="font-semibold">${selectedCalc.rentCost}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Utensils className="w-5 h-5 text-accent" />
                      <span>Alimentación</span>
                    </div>
                    <span className="font-semibold">${selectedCalc.foodCost}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Car className="w-5 h-5 text-chart-5" />
                      <span>Transporte</span>
                    </div>
                    <span className="font-semibold">${selectedCalc.transportCost}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <PartyPopper className="w-5 h-5 text-chart-4" />
                      <span>Entretenimiento</span>
                    </div>
                    <span className="font-semibold">${selectedCalc.entertainmentCost}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between text-lg font-display font-bold">
                    <span>Total mensual</span>
                    <span className="text-primary">${selectedCalc.monthlyLivingCost}</span>
                  </div>
                </div>

                {/* Comparison */}
                <div className="mt-6 p-4 bg-gain-light rounded-lg">
                  <div className="flex items-center gap-2 text-gain font-medium">
                    <ArrowRight className="w-5 h-5" />
                    Con ${monthlyBudget}/mes puedes vivir {selectedCalc.monthsAffordable} meses aquí
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;
