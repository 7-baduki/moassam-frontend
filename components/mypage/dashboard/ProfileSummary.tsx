import Image from 'next/image';
import Link from 'next/link';
import { DefaultAvatar } from '@/app/assets/images';
import { Button } from '@/components/common/button/Button';
import { ObservationCountIcon, BookmarkCountIcon, SettingIcon } from '@/app/assets/icons';

interface ProfileSummaryProps {
  name: string;
  email: string;
  profileImageUrl?: string;
  observationCount: number;
  bookmarkCount: number;
  onEditClick: () => void;
}

export function ProfileSummary({
  name,
  email,
  profileImageUrl,
  observationCount,
  bookmarkCount,
  onEditClick,
}: ProfileSummaryProps) {
  return (
    <>
      <div className="flex flex-col gap-1.5 bg-white px-4 pt-7.5 pb-3.5 md:px-9 xl:hidden">
        <div className="flex items-center gap-2 py-2">
          <div className="h-15 w-15 shrink-0 overflow-hidden rounded-full md:h-20 md:w-20">
            <Image
              src={profileImageUrl || DefaultAvatar}
              alt="프로필 아바타"
              width={80}
              height={80}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <p className="text-[18px] font-semibold text-black md:text-[20px]">
              {name} 선생님, <span className="text-pink-500">반가워요</span>
            </p>
            <p className="text-[14px] font-medium text-black-600 md:text-base">{email}</p>
          </div>
          <button type="button" onClick={onEditClick} aria-label="프로필 수정">
            <SettingIcon className="h-5 w-5 md:h-7.5 md:w-7.5" />
          </button>
        </div>
        <div className="flex gap-2.5 text-[14px] font-medium text-black-600 md:text-base">
          <span>
            관찰일지 <span className="font-semibold text-black-700">{observationCount}</span>
          </span>
          <span>
            북마크 <span className="font-semibold text-black-700">{bookmarkCount}</span>
          </span>
        </div>
      </div>

      <div className="hidden xl:flex xl:flex-row xl:items-center xl:divide-x-[0.5px] xl:divide-black-500">
        <div className="flex items-center gap-5 xl:pr-[clamp(1rem,5.2vw,4rem)]">
          <div className="h-21.25 w-21.25 overflow-hidden rounded-full">
            <Image
              src={profileImageUrl || DefaultAvatar}
              alt="프로필 아바타"
              width={85}
              height={85}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl leading-[120%] font-semibold text-black">
              {name} 선생님, <span className="whitespace-nowrap text-pink-500">반가워요</span>
            </p>
            <p className="text-base leading-[120%] font-medium text-black-600">
              필요한 자료를 빠르게 준비해보세요
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onEditClick} className="ml-auto">
            수정
          </Button>
        </div>
        <div className="flex flex-1 items-stretch gap-[clamp(1rem,5.2vw,4rem)] xl:pl-[clamp(1rem,5.2vw,4rem)]">
          <Link
            href="/mypage/observations"
            className="flex flex-1 flex-col items-center justify-center gap-2 rounded-[10px] bg-white px-[clamp(0.5rem,2.7vw,3.25rem)] py-3.25 transition-shadow duration-200 hover:shadow-[2px_2px_6px_0px_#0000000F]"
          >
            <ObservationCountIcon />
            <div className="flex flex-col items-center text-black">
              <span className="text-base font-semibold">{observationCount}</span>
              <span className="text-xs font-normal whitespace-nowrap">관찰일지</span>
            </div>
          </Link>
          <Link
            href="/mypage/bookmarks"
            className="flex flex-1 flex-col items-center justify-center gap-2 rounded-[10px] bg-white px-[clamp(0.5rem,2.7vw,3.25rem)] py-3.25 transition-shadow duration-200 hover:shadow-[2px_2px_6px_0px_#0000000F]"
          >
            <BookmarkCountIcon />
            <div className="flex flex-col items-center text-black">
              <span className="text-base font-semibold">{bookmarkCount}</span>
              <span className="text-xs font-normal whitespace-nowrap">북마크</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
