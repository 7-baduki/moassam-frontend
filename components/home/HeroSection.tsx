import Image from 'next/image';
import Badge from '@/components/common/badge/Badge';
import HeroImage from '@/app/assets/images/hero-section.png';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center bg-black-100">
      {/* 텍스트 영역 */}
      <div className="flex w-full flex-col items-center pt-16 pb-15">
        {/* NEW 뱃지 줄 */}
        <div className="flex items-center gap-2 rounded-[22px] border border-black-300 px-[8px] py-[5.5px]">
          <Badge label="NEW" variant="pink-light" />
          <span className="typo-line-m2 text-xs font-medium text-black-700">
            AI 문장 변환을 더한 유치원·어린이집 교사 커뮤니티
          </span>
        </div>

        {/* 헤드라인 */}
        <div className="mt-4 flex flex-col items-center gap-5 text-center">
          <h1 className="typo-line-m2 text-[40px] font-semibold text-black-800">
            <span className="text-pink-500">관찰일지</span>부터{' '}
            <span className="text-pink-500">수업자료</span>까지
            <br />
            선생님의 준비 시간을 줄여드릴게요
          </h1>
          <p className="typo-line-m4 text-[20px] font-semibold text-black-600">
            이제부터 반복되는 관찰일지와 자료 준비, 모아쌤에서 한 번에 끝내세요!
          </p>
        </div>
      </div>

      {/* 히어로 이미지 */}
      <div className="flex w-full justify-center pb-15">
        <Image
          src={HeroImage}
          alt="모아쌤 서비스 소개 일러스트"
          className="w-full max-w-[1172px]"
        />
      </div>
    </section>
  );
}
