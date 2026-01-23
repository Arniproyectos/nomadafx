import { Clock, TrendingDown, Zap } from "lucide-react";
import { Button } from "./ui/button";

const deals = [
  {
    icon: Zap,
    title: "Madrid → Buenos Aires",
    description: "Ida y vuelta con equipaje incluido",
    price: 459,
    originalPrice: 780,
    expires: "2 días",
    color: "sunset",
  },
  {
    icon: TrendingDown,
    title: "Barcelona → Nueva York",
    description: "Vuelo directo, clase económica premium",
    price: 389,
    originalPrice: 650,
    expires: "5 días",
    color: "ocean",
  },
  {
    icon: Clock,
    title: "México DF → París",
    description: "Escalas flexibles, fechas abiertas",
    price: 520,
    originalPrice: 890,
    expires: "7 días",
    color: "forest",
  },
];

const DealsSection = () => {
  return (
    <section id="ofertas" className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Ofertas limitadas
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            ¡No te pierdas estas 
            <span className="text-gradient-sunset"> ofertas!</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Precios exclusivos por tiempo limitado. Reserva ahora antes de que se agoten.
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {deals.map((deal, index) => (
            <article
              key={deal.title}
              className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl mb-4 ${
                deal.color === "sunset" ? "bg-accent/10 text-accent" :
                deal.color === "ocean" ? "bg-primary/10 text-primary" :
                "bg-forest/10 text-forest"
              }`}>
                <deal.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {deal.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {deal.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-foreground">
                  ${deal.price}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ${deal.originalPrice}
                </span>
                <span className="ml-auto text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                  -{Math.round((1 - deal.price / deal.originalPrice) * 100)}%
                </span>
              </div>

              {/* Expiry & CTA */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Expira en {deal.expires}</span>
                </div>
              </div>

              <Button variant="sand" className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground">
                Reservar ahora
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
