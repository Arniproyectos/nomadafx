import { Plane, Mail, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer id="contacto" className="bg-foreground text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Recibe las mejores ofertas en tu correo
            </h3>
            <p className="text-primary-foreground/70 mb-6">
              Únete a más de 50,000 viajeros que reciben ofertas exclusivas cada semana.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 flex items-center gap-2 bg-primary-foreground/10 rounded-xl px-4 py-3">
                <Mail className="h-5 w-5 text-primary-foreground/50" />
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="bg-transparent outline-none text-primary-foreground placeholder:text-primary-foreground/50 w-full"
                />
              </div>
              <Button variant="sunset" size="lg">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground text-foreground">
                <Plane className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-semibold">
                ViajaBarato
              </span>
            </a>
            <p className="text-primary-foreground/70 text-sm mb-4">
              Tu compañero de viaje para encontrar las mejores ofertas y destinos del mundo.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Destinos</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Europa</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Asia</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">América</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">África</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Compañía</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Trabaja con nosotros</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Términos de uso</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-primary-foreground/50 text-sm">
          <p>© 2025 ViajaBarato. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
