
import Navbar from "@/components/Navbar";
import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TutorialSection from "@/components/sections/TutorialSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Page() {
  return (
    <main>
      <Navbar/>
      <HomeSection/>
      <AboutSection/>
      <FeaturesSection/>
      <TutorialSection/>
      <ContactSection/>
    </main>
  );
}
