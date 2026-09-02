'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Badge from '@/components/common/badge/Badge';
import { Button } from '@/components/common/button/Button';
import {
  SolutionComment1,
  SolutionComment2,
  SolutionComment3,
  SolutionProcess,
  SolutionProcessMd,
} from '@/app/assets/images';
import { useUser } from '@/lib/user-context';
import { useScrollRoot } from '@/lib/scroll-root';
import { ChevronRightIcon } from '@/app/assets/icons';
import { useLoginModalStore } from '@/stores/loginModalStore';
import { useRouter } from 'next/navigation';

const PROCESS_IMG_CLASS =
  'rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-[2px_2px_40px_0px_#00000014]';

const COMMENTS = [SolutionComment1, SolutionComment2, SolutionComment3];

function createFadeUp(root: ReturnType<typeof useScrollRoot>, delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
    viewport: { once: true, amount: 0.15, root: root ?? undefined },
  };
}

export default function SolutionSection() {
  const user = useUser();
  const isLoggedIn = !!user;
  const root = useScrollRoot();
  const openLoginModal = useLoginModalStore((state) => state.open);
  const router = useRouter();

  return (
    <section className="w-full bg-black-50 py-15 xl:py-25" aria-label="해결방법 섹션">
      <div className="mx-auto w-full max-w-104 xl:max-w-293">
        <div className="flex flex-col items-center gap-4 xl:flex-row xl:items-start xl:justify-between">
          <motion.div
            className="flex flex-col items-center gap-2 xl:items-start xl:gap-4"
            {...createFadeUp(root, 0)}
          >
            <Badge label="해결방법" variant="pink-light" />
            <h2 className="typo-line-m2 text-center text-base font-semibold text-black-800 xl:text-left xl:text-2xl">
              막막했던 기록부터 자료까지,
              <br />한 번에 끝내세요!
            </h2>
          </motion.div>

          <div className="hidden flex-col items-end gap-1.5 xl:flex">
            {COMMENTS.map((src, i) => (
              <motion.div key={i} {...createFadeUp(root, 0.1 + i * 0.12)}>
                <Image src={src} alt="" height={43} />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="relative z-10 mt-4 xl:-mt-2.5 xl:rounded-tr-lg xl:rounded-br-lg xl:rounded-bl-lg xl:bg-white"
          {...createFadeUp(root, 0.2)}
        >
          <Image
            src={SolutionProcess}
            alt="모아쌤 이용 프로세스"
            className={`hidden w-full xl:block ${PROCESS_IMG_CLASS}`}
          />
          <Image
            src={SolutionProcessMd}
            alt="모아쌤 이용 프로세스"
            className={`mx-auto w-70.75 md:w-98 xl:hidden ${PROCESS_IMG_CLASS}`}
          />
        </motion.div>

        <motion.div
          className="mt-6 flex justify-center md:mt-7.5 xl:mt-15"
          {...createFadeUp(root, 0.3)}
        >
          <Button
            variant="primary"
            size="md"
            className="inline-flex h-8 w-30 items-center justify-center gap-1 py-[7.5px] text-xs whitespace-nowrap md:h-13 md:w-57.5 md:gap-2 md:py-3 md:text-xl"
            onClick={() => (isLoggedIn ? router.push('/community/board') : openLoginModal())}
          >
            {isLoggedIn ? '커뮤니티 시작하기' : '3초 간편 로그인 시작'}
            <span className="inline-flex h-1.75 w-1.75 items-center justify-center md:h-3.5 md:w-3.5">
              <ChevronRightIcon className="h-[5.6px] w-[2.8px] md:h-[11.2px] md:w-[5.6px]" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
