import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServiceSection from '@/components/home/ServiceSection';
import PainPointSection from '@/components/home/PainPointSection';
import SolutionSection from '@/components/home/SolutionSection';
import Footer from '@/components/common/footer/Footer';
import LoginRedirectHandler from '@/components/home/LoginRedirectHandler';
import ScrollToTopButton from '@/components/common/scroll-top/ScrollToTopButton';

export default function Home() {
  return (
    <div className="bg-black-100 md:min-w-150">
      <Suspense>
        <LoginRedirectHandler />
      </Suspense>
      <HeroSection />
      <ServiceSection />
      <PainPointSection />
      <SolutionSection />
      <Footer />
      <div className="fixed right-5 bottom-17.5 md:right-20">
        <ScrollToTopButton showAfter={300} />
      </div>
    </div>
  );
}
