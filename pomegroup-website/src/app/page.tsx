import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import VenturesGrid from '@/components/VenturesGrid';
import NumbersStrip from '@/components/NumbersStrip';
import FounderSection from '@/components/FounderSection';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <NumbersStrip />
      <VenturesGrid />
      <HowItWorks />
      <FounderSection />
      <ContactCTA />
      <Footer />
    </>
  );
}
