'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Badge from '@/components/common/badge/Badge';
import {
  PainPoint,
  PainPointCard1Md,
  PainPointCard2Md,
  PainPointCard3Md,
} from '@/app/assets/images';

const fadeUp = (delay = 0) =>
  ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut', delay },
    viewport: { once: true, margin: '-60px' },
  }) as const;

export default function PainPointSection() {
  return (
    <section className="w-full bg-black-100 pt-15 pb-13.5 md:py-25" aria-label="숨은 고충 섹션">
      <div className="mx-auto flex w-full max-w-142.5 flex-col items-center gap-7.5 md:max-w-293 md:flex-row md:items-start md:gap-26">
        <motion.div
          className="flex flex-col items-center gap-4 md:shrink-0 md:items-start"
          {...fadeUp(0)}
        >
          <Badge label="숨은고충" variant="pink-light" />
          <p className="typo-line-m2 text-center text-xl font-semibold text-black-800 md:text-left md:text-2xl">
            이런 순간,
            <br />
            자주 있지 않나요?
          </p>
        </motion.div>
        <div className="min-w-0 md:flex-1">
          <motion.div {...fadeUp(0.1)}>
            <Image src={PainPoint} alt="페인포인트 예시" className="hidden w-full lg:block" />
          </motion.div>
          <div className="flex flex-col items-center gap-7.5 lg:hidden">
            <div className="flex gap-7.5">
              <motion.div {...fadeUp(0.1)}>
                <Image
                  src={PainPointCard1Md}
                  alt="페인포인트 카드 1"
                  className="h-40 w-39 object-cover md:h-[285px] md:w-67.5"
                />
              </motion.div>
              <motion.div {...fadeUp(0.22)}>
                <Image
                  src={PainPointCard2Md}
                  alt="페인포인트 카드 2"
                  className="h-40 w-39 object-cover md:h-[285px] md:w-67.5"
                />
              </motion.div>
            </div>
            <motion.div {...fadeUp(0.34)}>
              <Image
                src={PainPointCard3Md}
                alt="페인포인트 카드 3"
                className="h-40 w-39 object-cover md:h-[285px] md:w-67.5"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
