import { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { countriesData, CountryData } from "@/lib/countryData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, Minus, DollarSign, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Mapeo de códigos de país ISO a los IDs del mapa
const countryCodeToGeoId: Record<string, string> = {
  AR: "032", // Argentina
  TR: "792", // Turkey
  EG: "818", // Egypt
  CO: "170", // Colombia
  VN: "704", // Vietnam
  MX: "484", // Mexico
  TH: "764", // Thailand
  ID: "360", // Indonesia
  ZA: "710", // South Africa
  HU: "348", // Hungary
  BR: "076", // Brazil
  PH: "608", // Philippines
  MA: "504", // Morocco
  PL: "616", // Poland
  VE: "862", // Venezuela
  LB: "422", // Lebanon
  LK: "144", // Sri Lanka
  NG: "566", // Nigeria
  PK: "586", // Pakistan
  GH: "288", // Ghana
  KE: "404", // Kenya
  UA: "804", // Ukraine
  RU: "643", // Russia
  JP: "392", // Japan
  CL: "152", // Chile
  PE: "604", // Peru
  CZ: "203", // Czech Republic
  RO: "642", // Romania
  IN: "356", // India
  MY: "458", // Malaysia
  BD: "050", // Bangladesh
  ET: "231", // Ethiopia
  KH: "116", // Cambodia
  NP: "524", // Nepal
  LA: "418", // Laos
  CR: "188", // Costa Rica
  UY: "858", // Uruguay
};

// Invertir el mapeo para buscar por geoId
const geoIdToCountryCode: Record<string, string> = Object.entries(countryCodeToGeoId).reduce(
  (acc, [code, geoId]) => ({ ...acc, [geoId]: code }),
  {}
);

const getOpportunityScore = (country: CountryData): number => {
  return Math.abs(country.devaluationVsUSD) * 0.5 + (1000 - country.monthlyLivingCost) * 0.05;
};

const getOpportunityColor = (score: number): string => {
  if (score > 35) return "hsl(var(--chart-2))"; // Verde - Alta oportunidad
  if (score > 25) return "hsl(var(--chart-1))"; // Teal - Media-alta
  if (score > 15) return "hsl(var(--chart-3))"; // Amarillo - Media
  return "hsl(var(--chart-4))"; // Naranja - Baja
};

const InteractiveMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [position, setPosition] = useState({ coordinates: [0, 20] as [number, number], zoom: 1 });

  const countryByCode = useMemo(() => {
    return countriesData.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {} as Record<string, CountryData>);
  }, []);

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  const handleCountryClick = (geoId: string) => {
    const countryCode = geoIdToCountryCode[geoId];
    if (countryCode && countryByCode[countryCode]) {
      setSelectedCountry(countryByCode[countryCode]);
    }
  };

  const handleCountryHover = (geoId: string, name: string) => {
    const countryCode = geoIdToCountryCode[geoId];
    if (countryCode && countryByCode[countryCode]) {
      const country = countryByCode[countryCode];
      setTooltipContent(`${country.flag} ${country.name}: ${country.devaluationVsUSD}% vs USD`);
    } else {
      setTooltipContent(name);
    }
  };

  const TrendIcon = selectedCountry?.trend === "up" 
    ? TrendingUp 
    : selectedCountry?.trend === "down" 
      ? TrendingDown 
      : Minus;

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
            <MapPin className="w-3 h-3 mr-1" />
            Explorador Global
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mapa de Oportunidades
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora el mundo y descubre dónde tu dinero rinde más. Los colores indican el nivel de oportunidad económica.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mapa */}
          <div className="lg:col-span-2">
            <Card className="card-glass overflow-hidden">
              <CardContent className="p-0 relative">
                <div className="aspect-[16/10] bg-muted/20">
                  <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                      scale: 120,
                    }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <ZoomableGroup
                      center={position.coordinates}
                      zoom={position.zoom}
                      onMoveEnd={handleMoveEnd}
                      minZoom={1}
                      maxZoom={5}
                    >
                      <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                          geographies.map((geo) => {
                            const geoId = geo.id;
                            const countryCode = geoIdToCountryCode[geoId];
                            const country = countryCode ? countryByCode[countryCode] : null;
                            const score = country ? getOpportunityScore(country) : 0;
                            const fillColor = country 
                              ? getOpportunityColor(score)
                              : "hsl(var(--muted))";

                            return (
                              <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={fillColor}
                                stroke="hsl(var(--border))"
                                strokeWidth={0.5}
                                style={{
                                  default: {
                                    outline: "none",
                                    transition: "all 0.2s",
                                  },
                                  hover: {
                                    fill: country ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                                    outline: "none",
                                    cursor: country ? "pointer" : "default",
                                  },
                                  pressed: {
                                    outline: "none",
                                  },
                                }}
                                onClick={() => handleCountryClick(geoId)}
                                onMouseEnter={() => handleCountryHover(geoId, geo.properties.name)}
                                onMouseLeave={() => setTooltipContent("")}
                              />
                            );
                          })
                        }
                      </Geographies>
                    </ZoomableGroup>
                  </ComposableMap>
                </div>
                
                {/* Tooltip */}
                {tooltipContent && (
                  <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-sm font-medium shadow-lg">
                    {tooltipContent}
                  </div>
                )}

                {/* Leyenda */}
                <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 text-xs">
                  <p className="font-semibold mb-2 text-foreground">Nivel de Oportunidad</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-2))" }} />
                      <span className="text-muted-foreground">Alta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-1))" }} />
                      <span className="text-muted-foreground">Media-Alta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-3))" }} />
                      <span className="text-muted-foreground">Media</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-4))" }} />
                      <span className="text-muted-foreground">Baja</span>
                    </div>
                  </div>
                </div>

                {/* Controles de zoom */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8"
                    onClick={() => setPosition(prev => ({ ...prev, zoom: Math.min(prev.zoom + 0.5, 5) }))}
                  >
                    +
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8"
                    onClick={() => setPosition(prev => ({ ...prev, zoom: Math.max(prev.zoom - 0.5, 1) }))}
                  >
                    -
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel de detalles */}
          <div className="lg:col-span-1">
            <Card className="card-glass h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center justify-between">
                  Detalles del País
                  {selectedCountry && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => setSelectedCountry(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCountry ? (
                  <div className="space-y-6">
                    {/* Header del país */}
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{selectedCountry.flag}</span>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{selectedCountry.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedCountry.currency}</p>
                      </div>
                    </div>

                    {/* Métricas principales */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Devaluación USD</p>
                        <p className={`text-lg font-bold ${selectedCountry.devaluationVsUSD < 0 ? 'text-destructive' : 'text-chart-2'}`}>
                          {selectedCountry.devaluationVsUSD}%
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Costo Mensual</p>
                        <p className="text-lg font-bold text-primary">
                          ${selectedCountry.monthlyLivingCost}
                        </p>
                      </div>
                    </div>

                    {/* Tendencia */}
                    <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                      <span className="text-sm text-muted-foreground">Tendencia</span>
                      <div className="flex items-center gap-2">
                        <TrendIcon className={`w-4 h-4 ${
                          selectedCountry.trend === 'down' ? 'text-destructive' :
                          selectedCountry.trend === 'up' ? 'text-chart-2' : 'text-muted-foreground'
                        }`} />
                        <span className="text-sm font-medium capitalize">
                          {selectedCountry.trend === 'down' ? 'Bajando' : 
                           selectedCountry.trend === 'up' ? 'Subiendo' : 'Estable'}
                        </span>
                      </div>
                    </div>

                    {/* Desglose de costos */}
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-3">Desglose de Costos</p>
                      <div className="space-y-2">
                        {[
                          { label: "Alquiler", value: selectedCountry.rentCost },
                          { label: "Alimentación", value: selectedCountry.foodCost },
                          { label: "Transporte", value: selectedCountry.transportCost },
                          { label: "Entretenimiento", value: selectedCountry.entertainmentCost },
                        ].map((item) => (
                          <div key={item.label} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="font-medium text-foreground">${item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Nivel de riesgo */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Nivel de Riesgo</span>
                      <Badge variant={
                        selectedCountry.riskLevel === 'low' ? 'default' :
                        selectedCountry.riskLevel === 'medium' ? 'secondary' : 'destructive'
                      }>
                        {selectedCountry.riskLevel === 'low' ? 'Bajo' :
                         selectedCountry.riskLevel === 'medium' ? 'Medio' : 'Alto'}
                      </Badge>
                    </div>

                    {/* Highlights */}
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Destinos Populares</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCountry.highlights.map((highlight) => (
                          <Badge key={highlight} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Big Mac Index */}
                    <div className="flex items-center justify-between bg-accent/10 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <span className="text-sm text-muted-foreground">Big Mac Index</span>
                      </div>
                      <span className="font-bold text-accent">${selectedCountry.bigMacIndex}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">
                      Haz clic en un país destacado del mapa para ver sus detalles económicos
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-2">
                      Los países con datos están coloreados según su oportunidad
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
