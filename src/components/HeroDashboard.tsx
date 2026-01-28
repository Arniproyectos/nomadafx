import { TrendingDown, ArrowRight, Globe2, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCountries, sortByOpportunity } from "@/hooks/use-countries";
import { Skeleton } from "@/components/ui/skeleton";

const HeroDashboard = () => {
  const { data: countries, isLoading } = useCountries();
  
  const topOpportunities = countries ? sortByOpportunity(countries).slice(0, 3) : [];
  const totalCountries = countries?.length || 0;
  const maxDevaluation = countries 
    ? Math.abs(Math.min(...countries.map(c => c.devaluationVsUSD)))
    : 0;
  const minCost = countries 
    ? Math.min(...countries.map(c => c.monthlyLivingCost))
    : 0;

  return (
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 rounded-full text-sm font-medium">
              <Globe2 className="w-4 h-4" />
              Turismo económico inteligente
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Viaja donde tu{" "}
              <span className="text-accent">dinero vale más</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl">
              Descubre destinos con monedas devaluadas, compara costos de vida 
              y planifica tu turismo rotativo basado en ciclos económicos globales.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                onClick={() => document.getElementById('rankings')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Rankings
                <TrendingDown className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/20"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Calculadora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-primary-foreground/20">
              <div>
                {isLoading ? (
                  <Skeleton className="h-8 w-12 bg-primary-foreground/20" />
                ) : (
                  <div className="text-2xl md:text-3xl font-bold">{totalCountries}</div>
                )}
                <div className="text-sm text-primary-foreground/70">Países analizados</div>
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="h-8 w-16 bg-primary-foreground/20" />
                ) : (
                  <div className="text-2xl md:text-3xl font-bold">{maxDevaluation}%</div>
                )}
                <div className="text-sm text-primary-foreground/70">Max. devaluación</div>
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="h-8 w-16 bg-primary-foreground/20" />
                ) : (
                  <div className="text-2xl md:text-3xl font-bold">${minCost}</div>
                )}
                <div className="text-sm text-primary-foreground/70">Min. costo/mes</div>
              </div>
            </div>
          </div>

          {/* Right Column - Top Opportunities Preview */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-primary-foreground/70 uppercase tracking-wider">
              🔥 Mejores oportunidades ahora
            </h3>
            
            <div className="space-y-3">
              {isLoading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-8 h-8 rounded-lg bg-primary-foreground/20" />
                      <Skeleton className="w-10 h-10 rounded bg-primary-foreground/20" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-24 mb-1 bg-primary-foreground/20" />
                        <Skeleton className="h-4 w-32 bg-primary-foreground/20" />
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-5 w-16 mb-1 bg-primary-foreground/20" />
                        <Skeleton className="h-4 w-20 bg-primary-foreground/20" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                topOpportunities.map((country, index) => (
                  <div
                    key={country.id}
                    className="group bg-primary-foreground/10 hover:bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/20 rounded-xl p-4 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center font-bold text-accent">
                        {index + 1}
                      </div>

                      {/* Flag & Name */}
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-3xl">{country.flag}</span>
                        <div>
                          <div className="font-semibold">{country.name}</div>
                          <div className="text-sm text-primary-foreground/70 flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            {country.highlights[0]}
                          </div>
                        </div>
                      </div>

                      {/* Devaluation */}
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-loss font-bold">
                          <TrendingDown className="w-4 h-4" />
                          {country.devaluationVsUSD}%
                        </div>
                        <div className="text-sm text-primary-foreground/70 flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ${country.monthlyLivingCost}/mes
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <a 
              href="#rankings" 
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Ver todos los rankings
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDashboard;
