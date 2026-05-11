import Image from 'next/image';
import Link from 'next/link';
import ErrorMascot from '@/app/assets/images/error-mascot.png';

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4.5">
      <Image src={ErrorMascot} alt="에러 마스코트" width={280} height={309} />
      <div className="flex w-52.5 flex-col items-center gap-4.5">
        <div className="flex flex-col items-center gap-2 px-2 text-center">
          <p className="text-xl font-semibold text-black">페이지를 찾을 수 없어요</p>
          <p className="text-sm text-black-500">요청하신 페이지가 존재하지 않아요</p>
        </div>
        <Link
          href="/"
          className="flex h-11 w-full items-center justify-center rounded-lg bg-green-500 text-sm font-semibold text-white hover:bg-green-700"
        >
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}
