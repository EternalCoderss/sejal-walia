import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import SkillsSection from '@/components/SkillsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import GoogleSheetsSetup from '@/components/GoogleSheetsSetup';

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  const handleSelectPlan = (planId: string, planName: string) => {
    setSelectedPlan(planName);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection onSelectPlan={handleSelectPlan} />
        <SkillsSection />
        <TestimonialsSection />
        <ContactSection selectedPlan={selectedPlan} />
      </main>
      <Footer />
      <GoogleSheetsSetup />
    </div>
  );
};

export default Index;
