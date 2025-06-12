import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { ScrollIndicator } from '@/components/ui/scroll-indicator';
import { HeroSection } from '@/components/sections/hero';
import { StatsSection } from '@/components/sections/stats';
import { ServicesSection } from '@/components/sections/services';
import { AnalyticsSection } from '@/components/sections/analytics';
import { AboutSection } from '@/components/sections/about';
import { ContactSection } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="font-inter bg-black overflow-x-hidden">
      <ScrollIndicator />
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <AnalyticsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
