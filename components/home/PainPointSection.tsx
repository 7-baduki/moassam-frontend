import Image from 'next/image';
import Badge from '@/components/common/badge/Badge';
import {
  PainPoint,
  PainPointMd,
  PainPointCard1Md,
  PainPointCard2Md,
  PainPointCard3Md,
} from '@/app/assets/images';

interface PainPointSectionProps {
  isLoggedIn?: boolean;
}

export default function PainPointSection({ isLoggedIn = false }: PainPointSectionProps) {
  return (
    <section className="w-full bg-black-100 pt-15 pb-13.5 md:py-25" aria-label="숨은 고충 섹션">
      <div className="mx-auto flex w-full max-w-[570px] flex-col items-center gap-7.5 md:max-w-[1172px] md:flex-row md:items-start md:gap-26">
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
          {isLoggedIn ? (
            <div className="flex flex-col items-center gap-7.5 md:hidden">
              <div className="flex gap-7.5">
                <Image src={PainPointCard1Md} alt="페인포인트 카드 1" className="w-[270px]" />
                <Image src={PainPointCard2Md} alt="페인포인트 카드 2" className="w-[270px]" />
              </div>
              <Image src={PainPointCard3Md} alt="페인포인트 카드 3" className="w-[270px]" />
            </div>
          ) : (
            <Image
              src={PainPointMd}
              alt="페인포인트 예시"
              className="w-full max-w-[300px] md:hidden"
            />
          )}
        </div>
      </div>
    </section>
  );
}
