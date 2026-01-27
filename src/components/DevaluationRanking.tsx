import { useState } from "react";
import { TrendingDown, Filter, Globe2 } from "lucide-react";
import { countriesData, sortByOpportunity, CountryData } from "@/lib/countryData";
import CountryCard from "./CountryCard";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

type FilterType = 'all' | 'america' | 'europe' | 'asia' | 'africa';
type SortType = 'opportunity' | 'devaluation' | 'cost';

const DevaluationRanking = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('opportunity');
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  const filters: { value: FilterType; label: string; icon: string }[] = [
    { value: 'all', label: 'Todos', icon: '🌍' },
    { value: 'america', label: 'América', icon: '🌎' },
    { value: 'europe', label: 'Europa', icon: '🌍' },
    { value: 'asia', label: 'Asia', icon: '🌏' },
    { value: 'africa', label: 'África', icon: '🌍' },
  ];

  const sortOptions: { value: SortType; label: string }[] = [
    { value: 'opportunity', label: 'Mayor oportunidad' },
    { value: 'devaluation', label: 'Mayor devaluación' },
    { value: 'cost', label: 'Menor costo' },
  ];

  const getFilteredAndSortedCountries = () => {
    let filtered = filter === 'all' 
      ? countriesData 
      : countriesData.filter(c => c.continent === filter);

    switch (sortBy) {
      case 'devaluation':
        return [...filtered].sort((a, b) => a.devaluationVsUSD - b.devaluationVsUSD);
      case 'cost':
        return [...filtered].sort((a, b) => a.monthlyLivingCost - b.monthlyLivingCost);
      default:
        return sortByOpportunity(filtered);
    }
  };

  const countries = getFilteredAndSortedCountries();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section 
      id="rankings" 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-16 bg-background transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gain-light text-gain rounded-full text-sm font-medium mb-3">
              <TrendingDown className="w-4 h-4" />
              Actualizado hoy
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Rankings de Oportunidad
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Países ordenados por oportunidad económica: combinamos devaluación de moneda 
              y costo de vida para encontrar los mejores destinos para nómadas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {countries.length} destinos disponibles
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Region Filter */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Button
                key={f.value}
                variant={filter === f.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f.value)}
                className={filter === f.value ? "bg-gradient-primary" : ""}
              >
                <span className="mr-1">{f.icon}</span>
                {f.label}
              </Button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 sm:ml-auto">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rankings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {countries.map((country, index) => (
            <CountryCard
              key={country.id}
              country={country}
              rank={index + 1}
              isSelected={selectedCountry?.id === country.id}
              onSelect={setSelectedCountry}
            />
          ))}
        </div>

        {countries.length === 0 && (
          <div className="text-center py-12">
            <Globe2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No hay países en esta región. Prueba con otro filtro.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DevaluationRanking;
