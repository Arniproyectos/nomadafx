import DestinationCard from "./DestinationCard";
import destinationBali from "@/assets/destination-bali.jpg";
import destinationPeru from "@/assets/destination-peru.jpg";
import destinationMorocco from "@/assets/destination-morocco.jpg";
import destinationTokyo from "@/assets/destination-tokyo.jpg";
import destinationMaldives from "@/assets/destination-maldives.jpg";

const destinations = [
  {
    image: destinationBali,
    destination: "Bali",
    country: "Indonesia",
    price: 449,
    originalPrice: 699,
    tag: "🔥 Popular",
  },
  {
    image: destinationPeru,
    destination: "Machu Picchu",
    country: "Perú",
    price: 399,
    originalPrice: 550,
    tag: "Aventura",
  },
  {
    image: destinationMorocco,
    destination: "Marrakech",
    country: "Marruecos",
    price: 299,
    tag: "Nuevo",
  },
  {
    image: destinationTokyo,
    destination: "Tokio",
    country: "Japón",
    price: 599,
    originalPrice: 899,
    tag: "⚡ Oferta",
  },
  {
    image: destinationMaldives,
    destination: "Maldivas",
    country: "Maldivas",
    price: 799,
    originalPrice: 1299,
    tag: "Lujo",
  },
];

const DestinationsSection = () => {
  return (
    <section id="destinos" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Destinos destacados
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Explora los destinos más
            <span className="text-gradient-ocean"> increíbles</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Seleccionamos las mejores ofertas para que viajes a los lugares más impresionantes del mundo sin gastar una fortuna.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {destinations.map((dest, index) => (
            <div
              key={dest.destination}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DestinationCard {...dest} />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors group"
          >
            Ver todos los destinos
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
