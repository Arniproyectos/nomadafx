import { TrendingDown, TrendingUp, DollarSign, Landmark, Globe2, AlertCircle } from "lucide-react";
import { countriesData } from "@/lib/countryData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const MetricsDashboard = () => {
  // Calculate aggregate stats
  const avgDevaluation = countriesData.reduce((acc, c) => acc + c.devaluationVsUSD, 0) / countriesData.length;
  const avgMonthlyCost = countriesData.reduce((acc, c) => acc + c.monthlyLivingCost, 0) / countriesData.length;
  const cheapestCountry = [...countriesData].sort((a, b) => a.monthlyLivingCost - b.monthlyLivingCost)[0];
  const mostDevalued = [...countriesData].sort((a, b) => a.devaluationVsUSD - b.devaluationVsUSD)[0];

  // Continent distribution
  const continentData = [
    { name: 'América', value: countriesData.filter(c => c.continent === 'america').length, color: 'hsl(var(--chart-1))' },
    { name: 'Europa', value: countriesData.filter(c => c.continent === 'europe').length, color: 'hsl(var(--chart-2))' },
    { name: 'Asia', value: countriesData.filter(c => c.continent === 'asia').length, color: 'hsl(var(--chart-3))' },
    { name: 'África', value: countriesData.filter(c => c.continent === 'africa').length, color: 'hsl(var(--chart-4))' },
  ];

  // Big Mac comparison data
  const bigMacData = countriesData
    .map(c => ({ name: c.name.slice(0, 8), bigMac: c.bigMacIndex, flag: c.flag }))
    .sort((a, b) => a.bigMac - b.bigMac)
    .slice(0, 8);

  // Sample historical data for main chart
  const trendData = mostDevalued.historicalData;

  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      id="metrics" 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-16 bg-background transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
            <Landmark className="w-4 h-4" />
            Dashboard de métricas
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Indicadores Económicos Globales
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Visualiza las tendencias de devaluación y costos de vida a través de nuestras métricas.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-loss-light flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-loss" />
              </div>
              <span className="text-xs text-muted-foreground">vs USD</span>
            </div>
            <div className="text-2xl font-display font-bold text-foreground">
              {avgDevaluation.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">Devaluación promedio</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-gain-light flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-gain" />
              </div>
              <span className="text-xs text-muted-foreground">USD/mes</span>
            </div>
            <div className="text-2xl font-display font-bold text-foreground">
              ${Math.round(avgMonthlyCost)}
            </div>
            <div className="text-sm text-muted-foreground">Costo promedio</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <span className="text-lg">{cheapestCountry.flag}</span>
              </div>
              <span className="text-xs text-muted-foreground">${cheapestCountry.monthlyLivingCost}</span>
            </div>
            <div className="text-2xl font-display font-bold text-foreground truncate">
              {cheapestCountry.name}
            </div>
            <div className="text-sm text-muted-foreground">Más económico</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-loss-light flex items-center justify-center">
                <span className="text-lg">{mostDevalued.flag}</span>
              </div>
              <span className="text-xs text-loss">{mostDevalued.devaluationVsUSD}%</span>
            </div>
            <div className="text-2xl font-display font-bold text-foreground truncate">
              {mostDevalued.name}
            </div>
            <div className="text-sm text-muted-foreground">Mayor devaluación</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Trend Chart */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-semibold text-lg">Tendencia: {mostDevalued.name}</h3>
                <p className="text-sm text-muted-foreground">Tipo de cambio últimos 6 meses</p>
              </div>
              <span className="text-2xl">{mostDevalued.flag}</span>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="hsl(var(--loss))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--loss))', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Big Mac Index */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-semibold text-lg">Big Mac Index</h3>
                <p className="text-sm text-muted-foreground">Precio en USD por país</p>
              </div>
              <span className="text-2xl">🍔</span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bigMacData} layout="vertical">
                  <XAxis 
                    type="number" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    domain={[0, 6]}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    width={70}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Precio']}
                  />
                  <Bar 
                    dataKey="bigMac" 
                    fill="hsl(var(--accent))" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Continent Distribution */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-semibold text-lg">Distribución por Continente</h3>
                <p className="text-sm text-muted-foreground">Países analizados</p>
              </div>
              <Globe2 className="w-6 h-6 text-muted-foreground" />
            </div>

            <div className="flex items-center gap-6">
              <div className="h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={continentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                      stroke="none"
                    >
                      {continentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex-1 space-y-3">
                {continentData.map((continent) => (
                  <div key={continent.name} className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: continent.color }}
                    />
                    <span className="flex-1 text-sm">{continent.name}</span>
                    <span className="font-semibold">{continent.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Overview */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-semibold text-lg">Nivel de Riesgo</h3>
                <p className="text-sm text-muted-foreground">Estabilidad económica</p>
              </div>
              <AlertCircle className="w-6 h-6 text-muted-foreground" />
            </div>

            <div className="space-y-4">
              {['low', 'medium', 'high'].map((risk) => {
                const count = countriesData.filter(c => c.riskLevel === risk).length;
                const percentage = (count / countriesData.length) * 100;
                const riskConfig = {
                  low: { label: 'Bajo', color: 'bg-gain', bgColor: 'bg-gain-light', icon: '✓' },
                  medium: { label: 'Medio', color: 'bg-accent', bgColor: 'bg-accent/20', icon: '⚠' },
                  high: { label: 'Alto', color: 'bg-loss', bgColor: 'bg-loss-light', icon: '!' },
                }[risk as 'low' | 'medium' | 'high'];

                return (
                  <div key={risk}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full ${riskConfig?.bgColor} flex items-center justify-center text-xs`}>
                          {riskConfig?.icon}
                        </span>
                        <span className="text-sm font-medium">Riesgo {riskConfig?.label}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{count} países</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${riskConfig?.color} rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  El nivel de riesgo considera la volatilidad cambiaria, estabilidad política y 
                  condiciones económicas generales del país.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsDashboard;
