'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Badge from '@/components/common/badge/Badge';
import HeroImage from '@/app/assets/images/home/hero/hero-section.png';
import HeroImageMd from '@/app/assets/images/home/hero/hero-section-md.png';
import { useUserStore } from '@/stores/userStore';
import { useCreditsQuery } from '@/hooks/queries/user';
import { ChevronRightIcon } from '@/app/assets/icons';
import { AsyncBoundary } from '@/lib/async-boundary';
import { ObservationCreditBadge } from '@/components/common/observation-credit-badge/ObservationCreditBadge';

function CreditBadge() {
  const { data: credits } = useCreditsQuery();

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 md:top-5 md:right-0 md:left-auto md:mr-20 md:translate-x-0">
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <ObservationCreditBadge remainingCount={credits?.balance ?? 0} />
      </motion.div>
    </div>
  );
}

function LoggedInHero({ userName = '' }: { userName: string }) {
  return (
    <div className="relative flex w-full flex-col items-center px-4 pt-10 pb-5.75 md:px-8 md:py-15 xl:px-0">
      <AsyncBoundary pendingFallback={null} rejectedFallback={() => null} authErrorFallback={false}>
        <CreditBadge />
      </AsyncBoundary>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
        className="typo-line-m2 mt-9 text-base font-semibold text-black-800 md:mt-0 md:text-xl"
      >
        안녕하세요, {userName} 선생님 👋
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.17 }}
        className="mt-7.5 flex w-full max-w-248.25 flex-col gap-1.75 rounded-2xl border border-pink-500 bg-white p-3 md:gap-4 md:p-7"
      >
        <div className="h-13 rounded-sm bg-black-100 p-2.25 md:h-29 md:rounded-lg md:p-5">
          <p className="typo-line-m4 flex items-center text-sm font-medium text-black-700 md:text-base">
            오늘 아이들과의 하루는 어땠나요?{' '}
            <span className="animate-blink ml-1 h-[1.2em] w-0.5 bg-pink-500" />
          </p>
        </div>
        <div className="flex justify-end">
          <Link
            href="/observations"
            className="flex h-8 w-30 cursor-pointer items-center justify-center rounded-lg bg-pink-500 text-xs font-medium text-white transition-colors hover:bg-pink-600 md:h-13 md:w-57.5 md:text-xl"
          >
            관찰일지 시작하기{' '}
            <ChevronRightIcon className="ml-1 h-2 w-1 overflow-visible md:ml-2.5 md:h-5 md:w-1.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function LoggedOutHero() {
  return (
    <div className="flex w-full flex-col items-center gap-10 pt-15 pb-15">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 rounded-[22px] border border-black-300 bg-white py-[5.5px] pr-3.5 pl-2">
          <Badge label="NEW" variant="pink-light" />
          <span className="typo-line-m2 text-[11px] font-medium text-black-700 md:text-xs">
            AI 문장 변환을 더한 유치원·어린이집 교사 커뮤니티
          </span>
        </div>

        <div className="mt-4 flex flex-col items-center gap-5 text-center">
          <h1 className="typo-line-m2 text-xl font-semibold text-black-800 md:text-[32px] xl:text-[40px]">
            <span className="text-pink-500">관찰일지</span>부터{' '}
            <span className="text-pink-500">활동자료</span>까지
            <br />
            선생님의 준비 시간을 줄여드릴게요
          </h1>
          <p className="typo-line-m4 text-center text-[13px] font-semibold text-black-600 md:text-base xl:text-xl">
            이제부터 반복되는 관찰일지와 자료 준비,
            <br />
            모아쌤에서 한 번에 끝내세요!
          </p>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <Image
          src={HeroImage}
          alt="모아쌤 서비스 소개 일러스트"
          className="hidden w-full max-w-293 xl:block"
        />
        <Image
          src={HeroImageMd}
          alt="모아쌤 서비스 소개 일러스트"
          className="mx-8 w-full max-w-179.75 xl:hidden"
        />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const user = useUserStore((state) => state.user);

  return (
    <section className="flex flex-col items-center bg-black-100" aria-label="히어로 섹션">
      {user ? <LoggedInHero userName={user.nickname} /> : <LoggedOutHero />}
    </section>
  );
}
