
import Navbar from "@/components/Navbar";
import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CTA from "@/components/sections/CTA";
import ContactSection from "@/components/sections/ContactSection";

export default function Page() {
  return (
    <main>
      <Navbar/>
      <HomeSection/>
      <AboutSection/>
      <FeaturesSection/>
      <CTA/>
      <ContactSection/>
    </main>
  );
}
