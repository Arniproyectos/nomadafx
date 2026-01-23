import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DestinationsSection from "@/components/DestinationsSection";
import DealsSection from "@/components/DealsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <DestinationsSection />
        <DealsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
