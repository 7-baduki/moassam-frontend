'use client';

import Image from 'next/image';
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
export default function SolutionSection() {
  const user = useUser();
  const isLoggedIn = !!user;
  return (
    <section className="w-full bg-black-50 py-15 md:pt-17.5 md:pb-25" aria-label="해결방법 섹션">
      <div className="mx-auto w-full max-w-104 md:max-w-293">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-2 md:items-start md:gap-4">
            <Badge label="해결방법" variant="pink-light" />
            <h2 className="typo-line-m2 text-center text-[16px] font-semibold text-black-800 md:text-left md:text-2xl">
              막막했던 기록부터 자료까지,
              <br />한 번에 끝내세요!
            </h2>
          </div>

          <div className="hidden flex-col items-end gap-1.5 md:flex">
            <Image src={SolutionComment1} alt="" height={43} />
            <Image src={SolutionComment2} alt="" height={43} />
            <Image src={SolutionComment3} alt="" height={43} />
          </div>
        </div>

        <div className="relative z-10 mt-4 md:-mt-2.5 md:overflow-hidden md:rounded-tr-lg md:rounded-br-lg md:rounded-bl-lg md:bg-white">
          <Image
            src={SolutionProcess}
            alt="모아쌤 이용 프로세스"
            className="hidden w-full rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-[2px_2px_40px_0px_#00000014] md:block"
          />
          <Image
            src={SolutionProcessMd}
            alt="모아쌤 이용 프로세스"
            className="mx-auto w-[283px] rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-[2px_2px_40px_0px_#00000014] md:hidden"
          />
        </div>

        <div className="mt-6 flex justify-center md:mt-15">
          <Button
            variant="primary"
            size="md"
            className="w-[120px] py-[7.5px] pr-[8px] pl-[14px] text-[12px] md:h-13 md:w-57.5 md:px-0 md:py-2 md:text-[20px]"
          >
            {isLoggedIn ? '커뮤니티 시작하기 >' : '3초 간편 로그인 시작 >'}
          </Button>
        </div>
      </div>
    </section>
  );
}
