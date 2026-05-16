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

const PROCESS_IMG_CLASS =
  'rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-[2px_2px_40px_0px_#00000014]';

const COMMENTS = [SolutionComment1, SolutionComment2, SolutionComment3];

export default function SolutionSection() {
  const user = useUser();
  const isLoggedIn = !!user;
  const root = useScrollRoot();
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
    viewport: { once: true, amount: 0.15, root: root ?? undefined },
  });

  return (
    <section className="w-full bg-black-50 py-15 md:pt-17.5 md:pb-25" aria-label="해결방법 섹션">
      <div className="mx-auto w-full max-w-104 md:max-w-293">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-between">
          <motion.div
            className="flex flex-col items-center gap-2 md:items-start md:gap-4"
            {...fadeUp(0)}
          >
            <Badge label="해결방법" variant="pink-light" />
            <h2 className="typo-line-m2 text-center text-base font-semibold text-black-800 md:text-left md:text-2xl">
              막막했던 기록부터 자료까지,
              <br />한 번에 끝내세요!
            </h2>
          </motion.div>

          <div className="hidden flex-col items-end gap-1.5 md:flex">
            {COMMENTS.map((src, i) => (
              <motion.div key={i} {...fadeUp(0.1 + i * 0.12)}>
                <Image src={src} alt="" height={43} />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="relative z-10 mt-4 md:-mt-2.5 md:overflow-hidden md:rounded-tr-lg md:rounded-br-lg md:rounded-bl-lg md:bg-white"
          {...fadeUp(0.2)}
        >
          <Image
            src={SolutionProcess}
            alt="모아쌤 이용 프로세스"
            className={`hidden w-full md:block ${PROCESS_IMG_CLASS}`}
          />
          <Image
            src={SolutionProcessMd}
            alt="모아쌤 이용 프로세스"
            className={`mx-auto w-[283px] md:hidden ${PROCESS_IMG_CLASS}`}
          />
        </motion.div>

        <motion.div className="mt-6 flex justify-center md:mt-15" {...fadeUp(0.3)}>
          <Button
            variant="primary"
            size="md"
            className="w-30 py-[7.5px] pr-2 pl-3.5 text-xs md:h-13 md:w-57.5 md:px-0 md:py-2 md:text-xl"
          >
            {isLoggedIn ? '커뮤니티 시작하기 >' : '3초 간편 로그인 시작 >'}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
