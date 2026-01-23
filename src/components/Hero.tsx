import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-santorini.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Santorini al atardecer"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm mb-8 animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground">
              +500 ofertas activas esta semana
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-slide-up">
            Descubre el mundo
            <br />
            <span className="text-gradient-sunset">sin vaciar tu bolsillo</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Encontramos las mejores ofertas de vuelos y destinos para que viajes más, gastando menos. Destinos increíbles desde $199.
          </p>

          {/* Search Box */}
          <div className="bg-card/95 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-elevated max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Destination Input */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <MapPin className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">¿A dónde?</p>
                  <input
                    type="text"
                    placeholder="Buscar destino..."
                    className="bg-transparent text-sm font-medium text-foreground outline-none w-full placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Date Input */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <Calendar className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">¿Cuándo?</p>
                  <input
                    type="text"
                    placeholder="Fechas flexibles"
                    className="bg-transparent text-sm font-medium text-foreground outline-none w-full placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Search Button */}
              <Button variant="hero" className="h-auto">
                <Search className="h-5 w-5" />
                Buscar ofertas
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">50K+</p>
              <p className="text-sm text-primary-foreground/70">Viajeros felices</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">120+</p>
              <p className="text-sm text-primary-foreground/70">Destinos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">40%</p>
              <p className="text-sm text-primary-foreground/70">Ahorro promedio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
