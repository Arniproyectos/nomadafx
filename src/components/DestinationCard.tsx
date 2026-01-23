import { MapPin, Plane } from "lucide-react";

interface DestinationCardProps {
  image: string;
  destination: string;
  country: string;
  price: number;
  originalPrice?: number;
  tag?: string;
}

const DestinationCard = ({
  image,
  destination,
  country,
  price,
  originalPrice,
  tag,
}: DestinationCardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-500 hover:shadow-elevated hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={`${destination}, ${country}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        
        {/* Tag Badge */}
        {tag && (
          <div className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            {tag}
          </div>
        )}
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-1.5 text-primary-foreground/80 mb-2">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">{country}</span>
          </div>
          
          <h3 className="font-display text-xl font-semibold text-primary-foreground mb-3">
            {destination}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-primary-foreground">
                ${price}
              </span>
              {originalPrice && (
                <span className="text-sm text-primary-foreground/60 line-through">
                  ${originalPrice}
                </span>
              )}
            </div>
            
            <button className="flex items-center gap-1.5 rounded-full bg-primary-foreground/20 px-3 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/30">
              <Plane className="h-3.5 w-3.5" />
              Ver más
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default DestinationCard;
