import Navbar from "../components/home/Navbar.jsx";
import HeroSection from "../components/home/HeroSection.jsx";
import OurMissionSection from "../components/home/OurMissionSection.jsx";
import TheTechnologyOfTrustSection from "../components/home/TheTechnologyOfTrustSection.jsx";
import GetInvolvedSection from "../components/home/GetInvolvedSection.jsx";
import Footer from "../components/home/Footer.jsx";

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <OurMissionSection />
        <TheTechnologyOfTrustSection />
        <GetInvolvedSection />
      </main>
      <Footer />
    </div>
  );
}
