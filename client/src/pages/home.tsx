import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { HeroSection } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats";
import { ServicesSection } from "@/components/sections/services";
import { ProjectsSection } from "@/components/sections/analytics";
import { AboutSection } from "@/components/sections/about";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FAQsSection } from "@/components/sections/faqs";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="font-inter bg-slate-50 overflow-x-hidden">
      <ScrollIndicator />
      <Navigation />
      <main>
        <HeroSection />
        {/* <StatsSection /> */}
        <ServicesSection />
        {/* <ProjectsSection /> /*}
        {/* <AboutSection /> */}
        {/* <TestimonialsSection /> */}
        <FAQsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

