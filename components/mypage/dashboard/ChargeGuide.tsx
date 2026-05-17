import Image from 'next/image';
import Link from 'next/link';
import { AMascot, SsamMascot } from '@/app/assets/images';
import { cn } from '@/utils/cn';

interface ChargeGuideProps {
  className?: string;
}

export function ChargeGuide({ className }: ChargeGuideProps) {
  return (
    <section
      className={cn(
        'mx-4 flex flex-col gap-5 rounded-2xl bg-white px-4 py-8.75 md:mx-9 md:gap-8.5 md:px-15 md:pt-7.5 md:pb-15',
        className,
      )}
    >
      <div className="text-center text-[12px] leading-[140%] font-medium text-black md:text-base">
        <p>매일 10회 자동 추가 !</p>
        <p>모아방과 자유게시판에 글을 작성하면 횟수를 더 얻을 수 있어요</p>
      </div>

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
        <Link
          href="/community/moabang"
          className="relative overflow-hidden rounded-[20px] bg-yellow-200 px-4 py-8.75 leading-[140%] transition-all hover:bg-yellow-400 hover:shadow-[0px_4px_16px_0px_#0000002E] md:px-8"
        >
          <p className="text-xs font-medium text-black-700">
            모아방에 자료 공유하고 생성 횟수
            <span className="text-sm font-semibold text-yellow-900"> 3회</span> 추가
          </p>
          <div className="pt-29.25">
            <p className="text-base font-semibold text-yellow-900">자료를 공유해주세요</p>
            <p className="text-xs font-medium text-yellow-700">
              작은 공유가 누군가에겐 큰 도움이 돼요
            </p>
          </div>
          <Image
            src={AMascot}
            alt="아 마스코트"
            width={160}
            height={160}
            className="absolute right-4 bottom-1.25 w-40 md:right-8 md:bottom-0 xl:w-[clamp(5rem,8.3vw,10rem)]"
          />
        </Link>

        <Link
          href="/community/board"
          className="relative overflow-hidden rounded-[20px] bg-green-50 px-4 py-8.75 leading-[140%] transition-all hover:bg-green-300 hover:shadow-[0px_4px_16px_0px_#0000002E] md:px-8"
        >
          <p className="text-xs font-medium text-black-700">
            자유게시판에 글 작성하고 생성 횟수
            <span className="text-sm font-semibold text-green-900"> 1회</span> 추가
          </p>
          <div className="pt-29.25">
            <p className="text-base font-semibold text-green-900">함께 고민해요</p>
            <p className="text-xs font-medium text-green-700">
              질문하고, 경험을 나누고, 함께 해결해요
            </p>
          </div>
          <Image
            src={SsamMascot}
            alt="쌤 마스코트"
            width={160}
            height={160}
            className="absolute right-4 bottom-1.25 w-40 md:right-8 md:bottom-0 xl:w-[clamp(5rem,8.3vw,10rem)]"
          />
        </Link>
      </div>
    </section>
  );
}
