import { Plane, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Plane className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              ViajaBarato
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#destinos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Destinos
            </a>
            <a href="#ofertas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Ofertas
            </a>
            <a href="#regiones" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Regiones
            </a>
            <a href="#contacto" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="ocean" size="lg">
              Suscribirse
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <a href="#destinos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Destinos
              </a>
              <a href="#ofertas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Ofertas
              </a>
              <a href="#regiones" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Regiones
              </a>
              <a href="#contacto" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </a>
              <Button variant="ocean" className="mt-2 w-full">
                Suscribirse
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
