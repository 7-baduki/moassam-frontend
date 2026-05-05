import Image from 'next/image';
import observationMascot from '@/app/assets/images/observation-mascot.png';
import Spinner from '@/components/common/spinner/Spinner';

export default function ObservationLoading() {
  return (
    <div className="flex flex-col items-center gap-5 pt-54.5">
      <Image src={observationMascot} alt="관찰일지 로딩 캐릭터" width={121} height={130} />
      <div className="flex flex-col items-center gap-0.5 text-center text-black">
        <p className="text-xl font-semibold">관찰일지를 준비하고 있어요</p>
        <p className="text-sm font-medium">
          영유아의 성향과 키워드를 바탕으로 내용을 정리하는 중이에요
        </p>
      </div>
      <Spinner />
    </div>
  );
}
