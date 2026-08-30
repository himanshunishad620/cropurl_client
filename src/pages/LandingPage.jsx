import Navbar from "@/components/core/Navbar";
import Analytic from "@/components/landingPageComponents/Analytic";
import Features from "@/components/landingPageComponents/Features";
import Footer from "@/components/landingPageComponents/Footer";
import GetIntoTouch from "@/components/landingPageComponents/GetIntoTouch";
import HeroSection from "@/components/landingPageComponents/HeroSection";
import HowWorks from "@/components/landingPageComponents/HowWorks";
import Testimonial from "@/components/landingPageComponents/Testimonial";
import UseCases from "@/components/landingPageComponents/UseCases";

export const LandingPage = () => {
  return (
    <div className="full bg-surface">
      <Navbar />
      <HeroSection />
      <HowWorks />
      <Features />
      <Analytic />
      <UseCases />
      <GetIntoTouch />
      <Testimonial />
      <Footer />
    </div>
  );
};
