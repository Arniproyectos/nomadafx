import Header from "@/components/Header";
import HeroDashboard from "@/components/HeroDashboard";
import InteractiveMap from "@/components/InteractiveMap";
import DevaluationRanking from "@/components/DevaluationRanking";
import CostCalculator from "@/components/CostCalculator";
import MetricsDashboard from "@/components/MetricsDashboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroDashboard />
        <InteractiveMap />
        <DevaluationRanking />
        <CostCalculator />
        <MetricsDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
