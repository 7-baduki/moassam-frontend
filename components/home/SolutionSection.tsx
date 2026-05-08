import Image from 'next/image';
import Badge from '@/components/common/badge/Badge';
import { Button } from '@/components/common/button/Button';
import {
  SolutionComment1,
  SolutionComment2,
  SolutionComment3,
  SolutionProcess,
} from '@/app/assets/images';

interface SolutionSectionProps {
  isLoggedIn?: boolean;
}

export default function SolutionSection({ isLoggedIn = true }: SolutionSectionProps) {
  return (
    <section className="w-full bg-black-50 py-20">
      <div className="mx-auto w-full max-w-293">
        {/* 상단: 헤드라인 + 코멘트 */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col items-start gap-4">
            <Badge label="해결방법" variant="pink-light" />
            <h2 className="typo-line-m2 text-2xl font-semibold text-black-800">
              막막했던 기록부터 자료까지, 한 번에 끝내세요!
            </h2>
          </div>

          {/* 코멘트 이미지: 하단 10px는 프로세스 영역에 가려짐 */}
          <div className="flex flex-col items-end gap-1.5">
            <Image src={SolutionComment1} alt="" height={43} />
            <Image src={SolutionComment2} alt="" height={43} />
            <Image src={SolutionComment3} alt="" height={43} />
          </div>
        </div>

        {/* 프로세스: -mt로 코멘트 하단 10px 덮음 */}
        <div className="relative z-10 -mt-2.5" style={{ boxShadow: '2px 2px 40px 0px #00000014' }}>
          <div className="overflow-hidden rounded-tr-lg rounded-br-lg rounded-bl-lg bg-white">
            <Image src={SolutionProcess} alt="모아쌤 이용 프로세스" className="w-full" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Button variant="primary" size="md" className="h-13 w-57.5 text-[20px]">
            {isLoggedIn ? '커뮤니티 시작하기 >' : '3초 간편 로그인 시작 >'}
          </Button>
        </div>
      </div>
    </section>
  );
}
