import { Button } from '@/components/common/button/Button';
import { SearchIcon } from '@/app/assets/icons';

interface CommunityTitleBarProps {
  title: string;
  description: string;
  onWrite?: () => void;
}

export default function CommunityTitleBar({ title, description, onWrite }: CommunityTitleBarProps) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center gap-3 py-[10.5px]">
        <h2 className="typo-line-m2 text-lg font-semibold text-black-800">{title}</h2>
        <p className="typo-line-m4 text-sm font-medium text-black-600">{description}</p>
      </div>
      <div className="flex items-center gap-3 py-[7.5px]">
        <div className="flex items-center gap-2 rounded-lg border border-black-300 py-[3.5px] pr-3 pl-4">
          <SearchIcon className="h-4 w-4 shrink-0 text-black-400" />
          <input
            type="search"
            aria-label="게시글 검색"
            placeholder="주제를 입력하세요"
            className="w-40 text-sm text-black-800 outline-none placeholder:text-black-400"
          />
        </div>
        <Button size="sm" onClick={onWrite}>
          새글쓰기
        </Button>
      </div>
    </div>
  );
}
