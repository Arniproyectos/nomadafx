import { TrendingDown, TrendingUp, Minus, DollarSign, MapPin, AlertTriangle } from "lucide-react";
import { CountryData } from "@/hooks/use-countries";
import { cn } from "@/lib/utils";

interface CountryCardProps {
  country: CountryData;
  rank: number;
  onSelect?: (country: CountryData) => void;
  isSelected?: boolean;
}

const CountryCard = ({ country, rank, onSelect, isSelected }: CountryCardProps) => {
  const getTrendIcon = () => {
    switch (country.trend) {
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = () => {
    switch (country.trend) {
      case 'down':
        return 'text-gain bg-gain-light';
      case 'up':
        return 'text-loss bg-loss-light';
      default:
        return 'text-neutral bg-neutral-light';
    }
  };

  const getRiskBadge = () => {
    switch (country.riskLevel) {
      case 'high':
        return 'bg-loss-light text-loss';
      case 'medium':
        return 'bg-accent/20 text-accent';
      default:
        return 'bg-gain-light text-gain';
    }
  };

  return (
    <div
      onClick={() => onSelect?.(country)}
      className={cn(
        "group bg-card border rounded-xl p-4 transition-all duration-200 cursor-pointer hover:shadow-medium",
        isSelected ? "border-primary shadow-glow ring-2 ring-primary/20" : "border-border hover:border-primary/50"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Rank Badge */}
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
          {rank}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{country.flag}</span>
            <h3 className="font-display font-semibold text-foreground truncate">
              {country.name}
            </h3>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="w-3 h-3" />
            {country.highlights.slice(0, 2).join(", ")}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Devaluation */}
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-xs text-muted-foreground mb-0.5">vs USD</div>
              <div className={cn(
                "font-semibold flex items-center gap-1",
                country.devaluationVsUSD < 0 ? "text-gain" : "text-loss"
              )}>
                {getTrendIcon()}
                {country.devaluationVsUSD}%
              </div>
            </div>

            {/* Monthly Cost */}
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-xs text-muted-foreground mb-0.5">Costo/mes</div>
              <div className="font-semibold flex items-center gap-1 text-foreground">
                <DollarSign className="w-3 h-3" />
                ${country.monthlyLivingCost}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Badges */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          {/* Trend Badge */}
          <span className={cn(
            "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
            getTrendColor()
          )}>
            {getTrendIcon()}
            {country.trend === 'down' ? 'Baja' : country.trend === 'up' ? 'Sube' : 'Estable'}
          </span>

          {/* Risk Badge */}
          {country.riskLevel !== 'low' && (
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              getRiskBadge()
            )}>
              <AlertTriangle className="w-3 h-3" />
              {country.riskLevel === 'high' ? 'Alto' : 'Medio'}
            </span>
          )}
        </div>
      </div>

      {/* Big Mac Index Footer */}
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Big Mac Index</span>
        <span className="font-medium">${country.bigMacIndex.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CountryCard;
