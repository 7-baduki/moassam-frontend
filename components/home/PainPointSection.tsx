import Image from 'next/image';
import Badge from '@/components/common/badge/Badge';
import { PainPoint, PainPointMd } from '@/app/assets/images';

export default function PainPointSection() {
  return (
    <section className="w-full bg-black-100 pt-15 pb-13.5 md:py-25">
      <div className="mx-auto flex w-full max-w-[1172px] flex-col items-center gap-7.5 md:flex-row md:items-start md:gap-26">
        <div className="flex flex-col items-center gap-4 md:shrink-0 md:items-start">
          <Badge label="숨은고충" variant="pink-light" />
          <p className="typo-line-m2 text-center text-xl font-semibold text-black-800 md:text-left md:text-2xl">
            이런 순간,
            <br />
            자주 있지 않나요?
          </p>
        </div>
        <div className="min-w-0 md:flex-1">
          <Image src={PainPoint} alt="페인포인트 예시" className="hidden w-full md:block" />
          <Image src={PainPointMd} alt="페인포인트 예시" className="w-full md:hidden" />
        </div>
      </div>
    </section>
  );
}
