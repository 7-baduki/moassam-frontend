import Badge from '@/components/common/badge/Badge';
import ServiceObservationChar from '@/app/assets/images/home/service-observation.png';
import ServiceObservationHoverChar from '@/app/assets/images/home/service-observation-hover.png';
import ServiceBoardChar from '@/app/assets/images/home/service-board.png';
import ServiceBoardHoverChar from '@/app/assets/images/home/service-board-hover.png';
import ServiceMoabangChar from '@/app/assets/images/home/service-moabang.png';
import ServiceMoabangHoverChar from '@/app/assets/images/home/service-moabang-hover.png';
import ServiceCard from './ServiceCard';

export default function ServiceSection() {
  return (
    <section className="w-full bg-white py-15 md:py-20" aria-label="주요 서비스 섹션">
      <div className="mx-auto flex w-full flex-col items-center gap-7.5 md:max-w-293 md:flex-row md:items-start md:gap-17.5">
        <div className="shrink-0 md:mt-7.5">
          <Badge label="주요 서비스" variant="pink-light" />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <ServiceCard
            label="AI 관찰일지"
            description={'한줄만 적어도\n전문 관찰일지 완성'}
            href="/observations"
            characterSrc={ServiceObservationChar}
            characterHoverSrc={ServiceObservationHoverChar}
            mainColor="#B14D55"
            upperBg="#FFF3F4"
            lowerBg="#FBC9CDE5"
          />
          <ServiceCard
            label="자유게시판"
            description={'게시글 1개당\n생성횟수 1회 추가'}
            href="/community/board"
            characterSrc={ServiceBoardChar}
            characterHoverSrc={ServiceBoardHoverChar}
            mainColor="#377A53"
            upperBg="#E9F6E6"
            lowerBg="#B7DDB1E5"
          />
          <ServiceCard
            label="모아방"
            description={'자료공유 완료 시\n생성횟수 3회 추가'}
            href="/community/moabang"
            characterSrc={ServiceMoabangChar}
            characterHoverSrc={ServiceMoabangHoverChar}
            mainColor="#A66B1F"
            upperBg="#FFF9F0"
            lowerBg="#FDEFD4E5"
          />
        </div>
      </div>
    </section>
  );
}
