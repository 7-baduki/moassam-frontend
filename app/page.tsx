import HeroSection from '@/components/home/HeroSection';
import ServiceSection from '@/components/home/ServiceSection';
import PainPointSection from '@/components/home/PainPointSection';
import SolutionSection from '@/components/home/SolutionSection';

export default function Home() {
  return (
    <div className="min-w-[600px] bg-black-100">
      <HeroSection isLoggedIn={false} />
      <ServiceSection />
      <PainPointSection isLoggedIn={false} />
      <SolutionSection isLoggedIn={false} />
    </div>
  );
}
