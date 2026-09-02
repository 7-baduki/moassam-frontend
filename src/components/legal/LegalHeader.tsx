import Image from 'next/image';
import { ErrorIcon } from '@/app/assets/icons';
import { LegalMascot } from '@/app/assets/images';
import LegalTabs from './LegalTabs';

interface LegalHeaderProps {
  title: string;
  effectiveDate: string;
  bannerText: string;
  bannerDescription: string;
}

export default function LegalHeader({
  title,
  effectiveDate,
  bannerText,
  bannerDescription,
}: LegalHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between py-3">
        <h1 className="text-[18px] font-semibold text-black-800 md:text-2xl">{title}</h1>
        <span className="text-xs text-black-600 md:text-sm">시행일 {effectiveDate}</span>
      </div>

      <LegalTabs />

      <div className="my-4 flex flex-col items-center rounded-2xl bg-pink-50 px-3 py-2 md:mt-5 md:mb-8 md:flex-row md:justify-between md:px-6 md:py-6.25 xl:px-10 xl:py-7.5">
        <Image
          src={LegalMascot}
          alt="마스코트"
          width={120}
          height={98}
          className="h-20.25 w-25 shrink-0 md:order-2 md:mb-0 md:h-24.5 md:w-30"
        />
        <div className="flex flex-col gap-1 xl:gap-2.5">
          <span className="flex items-center gap-2 text-base font-semibold text-black-800 md:text-[18px]">
            <ErrorIcon className="h-4 w-4 shrink-0" />
            {bannerText}
          </span>
          <p className="pl-6 text-sm font-medium text-black-700 md:text-base">
            {bannerDescription}
          </p>
        </div>
      </div>
    </>
  );
}
