import HeroSection from '@/components/home/HeroSection';
import ServiceSection from '@/components/home/ServiceSection';
import PainPointSection from '@/components/home/PainPointSection';
import SolutionSection from '@/components/home/SolutionSection';

export default function Home() {
  return (
    <div className="bg-black-100 md:min-w-150">
      <HeroSection />
      <ServiceSection />
      <PainPointSection />
      <SolutionSection />
    </div>
  );
}
