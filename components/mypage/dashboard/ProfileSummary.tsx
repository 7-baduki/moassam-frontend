import Image from 'next/image';
import Link from 'next/link';
import { DefaultAvatar } from '@/app/assets/images';
import { Button } from '@/components/common/button/Button';
import { ObservationCountIcon, BookmarkCountIcon } from '@/app/assets/icons';

interface ProfileSummaryProps {
  name: string;
  observationCount: number;
  bookmarkCount: number;
  onEditClick: () => void;
}

export function ProfileSummary({
  name,
  observationCount,
  bookmarkCount,
  onEditClick,
}: ProfileSummaryProps) {
  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:divide-x-[0.5px] xl:divide-black-500">
      <div className="flex items-center gap-5 pr-25">
        <div className="h-21.25 w-21.25 overflow-hidden rounded-full">
          <Image src={DefaultAvatar} alt="프로필 아바타" width={85} height={85} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl leading-[120%] font-semibold text-black">
            {name} 선생님, <span className="text-pink-500">반가워요</span>
          </p>
          <p className="text-base leading-[120%] font-medium text-black-600">
            필요한 자료를 빠르게 준비해보세요
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onEditClick} className="ml-auto">
          수정
        </Button>
      </div>

      <div className="flex flex-1 items-stretch gap-25 xl:pl-25">
        <Link
          href="/mypage/observations"
          className="flex flex-1 flex-col items-center justify-center gap-2 rounded-[10px] bg-white px-13 py-3.25 transition-shadow duration-200 hover:shadow-[2px_2px_6px_0px_#0000000F]"
        >
          <ObservationCountIcon />
          <div className="flex flex-col items-center text-black">
            <span className="text-base font-semibold">{observationCount}</span>
            <span className="text-xs font-normal">관찰일지</span>
          </div>
        </Link>
        <Link
          href="/mypage/bookmarks"
          className="flex flex-1 flex-col items-center justify-center gap-2 rounded-[10px] bg-white px-13 py-3.25 transition-shadow duration-200 hover:shadow-[2px_2px_6px_0px_#0000000F]"
        >
          <BookmarkCountIcon />
          <div className="flex flex-col items-center text-black">
            <span className="text-base font-semibold">{bookmarkCount}</span>
            <span className="text-xs font-normal">북마크</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
