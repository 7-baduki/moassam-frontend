'use client';

import { motion, type Variants } from 'framer-motion';
import Badge from '@/components/common/badge/Badge';
import ServiceObservationChar from '@/app/assets/images/home/service/service-observation.png';
import ServiceObservationHoverChar from '@/app/assets/images/home/service/service-observation-hover.png';
import ServiceBoardChar from '@/app/assets/images/home/service/service-board.png';
import ServiceBoardHoverChar from '@/app/assets/images/home/service/service-board-hover.png';
import ServiceMoabangChar from '@/app/assets/images/home/service/service-moabang.png';
import ServiceMoabangHoverChar from '@/app/assets/images/home/service/service-moabang-hover.png';
import ServiceCard from './ServiceCard';
import { useScrollRoot } from '@/lib/scroll-root';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  }),
};

const SERVICE_CARDS = [
  {
    label: 'AI 관찰일지',
    description: '한줄만 적어도\n전문 관찰일지 완성',
    href: '/observations',
    characterSrc: ServiceObservationChar,
    characterHoverSrc: ServiceObservationHoverChar,
    mainColor: '#B14D55',
    upperBg: '#FFF3F4',
    lowerBg: '#FBC9CDE5',
  },
  {
    label: '자유게시판',
    description: '게시글 1개당\n생성횟수 1회 추가',
    href: '/community/board',
    characterSrc: ServiceBoardChar,
    characterHoverSrc: ServiceBoardHoverChar,
    mainColor: '#377A53',
    upperBg: '#E9F6E6',
    lowerBg: '#B7DDB1E5',
  },
  {
    label: '모아방',
    description: '자료공유 완료 시\n생성횟수 3회 추가',
    href: '/community/moabang',
    characterSrc: ServiceMoabangChar,
    characterHoverSrc: ServiceMoabangHoverChar,
    mainColor: '#A66B1F',
    upperBg: '#FFF9F0',
    lowerBg: '#FDEFD4E5',
  },
];

export default function ServiceSection() {
  const root = useScrollRoot();
  const motionProps = {
    variants: fadeUp,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.15, root: root ?? undefined },
  } as const;

  return (
    <section className="w-full bg-white py-15 xl:py-20" aria-label="주요 서비스 섹션">
      <div className="mx-auto flex w-full flex-col items-center gap-7.5 md:max-w-293 xl:flex-row xl:items-start xl:gap-17.5">
        <motion.div className="shrink-0 xl:mt-7.5" custom={0} {...motionProps}>
          <Badge label="주요 서비스" variant="pink-light" />
        </motion.div>
        <div className="flex flex-col gap-4 xl:flex-row">
          {SERVICE_CARDS.map((card, i) => (
            <motion.div key={card.label} custom={i * 0.12} {...motionProps}>
              <ServiceCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
