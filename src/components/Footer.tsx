import { Globe, Mail, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">NómadaFX</span>
            </div>
            <p className="text-background/70 max-w-md mb-4">
              Descubre destinos con monedas devaluadas y maximiza tu poder adquisitivo. 
              Turismo inteligente basado en ciclos económicos.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Explorar</h4>
            <ul className="space-y-2">
              <li>
                <a href="#rankings" className="text-background/70 hover:text-background transition-colors">
                  Rankings
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-background/70 hover:text-background transition-colors">
                  Calculadora
                </a>
              </li>
              <li>
                <a href="#metrics" className="text-background/70 hover:text-background transition-colors">
                  Métricas
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contacto</h4>
            <a 
              href="mailto:hola@nomadafx.com" 
              className="flex items-center gap-2 text-background/70 hover:text-background transition-colors"
            >
              <Mail className="w-4 h-4" />
              hola@nomadafx.com
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © {currentYear} NómadaFX. Datos de ejemplo para demostración.
          </p>
          <div className="flex items-center gap-6 text-sm text-background/60">
            <a href="#" className="hover:text-background transition-colors">Privacidad</a>
            <a href="#" className="hover:text-background transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
