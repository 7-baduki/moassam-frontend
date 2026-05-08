import Image from 'next/image';
import Badge from '@/components/common/badge/Badge';
import { Button } from '@/components/common/button/Button';
import { HeroBadge } from '@/app/assets/images';
import HeroImage from '@/app/assets/images/hero-section.png';
import HeroImageMd from '@/app/assets/images/hero-section-md.png';

interface HeroSectionProps {
  isLoggedIn?: boolean;
  userName?: string;
  remainingCount?: number;
}

function LoggedInHero({
  userName = '',
  remainingCount = 0,
}: {
  userName: string;
  remainingCount: number;
}) {
  return (
    <div className="relative flex w-full flex-col items-center px-10 pt-15 pb-25 md:px-0">
      {/* 남은 횟수 뱃지 */}
      <div className="absolute top-6 right-0 mr-20 flex items-center gap-2 rounded-[30px] border border-yellow-600 bg-yellow-200 py-1 pr-3 pl-1 shadow-[2px_2px_8px_0px_#00000014]">
        <Image src={HeroBadge} alt="" width={24} height={24} />
        <span className="typo-line-m2 text-xs font-semibold text-black-800">
          오늘 생성횟수 {remainingCount}기 남았어요!
        </span>
      </div>

      {/* 인사 */}
      <h1 className="typo-line-m2 text-[20px] font-semibold text-black-800">
        안녕하세요, {userName} 👋
      </h1>

      {/* 텍스트 에리어 */}
      <div className="mt-7.5 flex w-full max-w-200 flex-col gap-4 rounded-2xl border border-pink-500 bg-white p-7">
        <div className="h-29 bg-black-100 p-5">
          <p className="typo-line-m4 flex items-center text-[16px] font-medium text-black-700">
            오늘 아이들과의 하루는 어땠나요?{' '}
            <span className="animate-blink ml-1 h-[1.2em] w-[2px] bg-pink-500" />
          </p>
        </div>
        <div className="flex justify-end">
          <Button size="md" variant="primary" className="h-13 w-57.5 text-[20px]">
            관찰일지 시작하기 &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}

function LoggedOutHero() {
  return (
    <>
      {/* 텍스트 영역 */}
      <div className="flex w-full flex-col items-center pt-16 pb-15">
        {/* NEW 뱃지 줄 */}
        <div className="flex items-center gap-2 rounded-[22px] border border-black-300 bg-white py-[5.5px] pr-3.5 pl-2">
          <Badge label="NEW" variant="pink-light" />
          <span className="typo-line-m2 text-sm font-medium text-black-700 md:text-xs">
            AI 문장 변환을 더한 유치원·어린이집 교사 커뮤니티
          </span>
        </div>

        {/* 헤드라인 */}
        <div className="mt-4 flex flex-col items-center gap-5 text-center">
          <h1 className="typo-line-m2 text-[32px] font-semibold text-black-800 md:text-[40px]">
            <span className="text-pink-500">관찰일지</span>부터{' '}
            <span className="text-pink-500">수업자료</span>까지
            <br />
            선생님의 준비 시간을 줄여드릴게요
          </h1>
          <p className="typo-line-m4 text-base font-semibold text-black-600 md:text-xl">
            이제부터 반복되는 관찰일지와 자료 준비, 모아쌤에서 한 번에 끝내세요!
          </p>
        </div>
      </div>

      {/* 히어로 이미지 */}
      <div className="flex w-full justify-center pb-15">
        <Image
          src={HeroImage}
          alt="모아쌤 서비스 소개 일러스트"
          className="hidden w-full max-w-293 md:block"
        />
        <Image
          src={HeroImageMd}
          alt="모아쌤 서비스 소개 일러스트"
          className="block w-full max-w-[719px] md:hidden"
        />
      </div>
    </>
  );
}

export default function HeroSection({
  isLoggedIn = true,
  userName = '모아선생님',
  remainingCount = 7,
}: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center bg-black-100" aria-label="히어로 섹션">
      {isLoggedIn ? (
        <LoggedInHero userName={userName} remainingCount={remainingCount} />
      ) : (
        <LoggedOutHero />
      )}
    </section>
  );
}
