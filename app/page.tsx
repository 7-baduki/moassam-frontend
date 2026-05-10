import { getProfile } from '@/api/user.api';
import HeroSection from '@/components/home/HeroSection';
import ServiceSection from '@/components/home/ServiceSection';
import PainPointSection from '@/components/home/PainPointSection';
import SolutionSection from '@/components/home/SolutionSection';

export default async function Home() {
  const user = await getProfile();

  return (
    <div className="min-w-[600px] bg-black-100">
      <HeroSection user={user} />
      <ServiceSection />
      <PainPointSection />
      <SolutionSection />
    </div>
  );
}
