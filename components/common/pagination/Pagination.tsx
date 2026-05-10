import { cn } from '@/utils/cn';
import { ChevronDownIcon } from '@/app/assets/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function getPageNumbers(totalPages: number): number[] {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}

const BUTTON_BASE =
  'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors';
const ACTIVE = 'bg-pink-500 text-white border border-pink-500';
const INACTIVE = 'bg-white text-black-700 border border-black-200 hover:bg-black-200';
const DISABLED = 'bg-white text-black-400 border border-black-200 cursor-not-allowed';

export default function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 0) return null;

  const pages = getPageNumbers(totalPages);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  function handleFirst() {
    if (isFirst) return;
    onChange(1);
  }

  function handleLast() {
    if (isLast) return;
    onChange(totalPages);
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={handleFirst}
        disabled={isFirst}
        className={cn(BUTTON_BASE, isFirst ? DISABLED : INACTIVE)}
        aria-label="첫 번째 페이지"
      >
        <ChevronDownIcon
          className={cn('h-4 w-4 rotate-90', isFirst && '[&_path]:stroke-black-400')}
        />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onChange(page)}
          className={cn(BUTTON_BASE, currentPage === page ? ACTIVE : INACTIVE)}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={handleLast}
        disabled={isLast}
        className={cn(BUTTON_BASE, isLast ? DISABLED : INACTIVE)}
        aria-label="마지막 페이지"
      >
        <ChevronDownIcon
          className={cn('h-4 w-4 -rotate-90', isLast && '[&_path]:stroke-black-400')}
        />
      </button>
    </div>
  );
}
