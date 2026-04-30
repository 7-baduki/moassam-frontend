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
  'flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-medium transition-colors';
const ACTIVE = 'bg-pink-500 text-white shadow-sm';
const INACTIVE = 'bg-white text-black-700 shadow-sm hover:bg-black-100';
const DISABLED = 'bg-white text-black-400 shadow-sm cursor-not-allowed';

export default function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 0) return null;

  const pages = getPageNumbers(totalPages);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  function handlePrev() {
    if (isFirst) return;
    onChange(currentPage - 1);
  }

  function handleNext() {
    if (isLast) return;
    onChange(currentPage + 1);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handlePrev}
        disabled={isFirst}
        className={cn(BUTTON_BASE, isFirst ? DISABLED : INACTIVE)}
        aria-label="이전 페이지"
      >
        <ChevronDownIcon className="h-4 w-4 rotate-90" />
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
        onClick={handleNext}
        disabled={isLast}
        className={cn(BUTTON_BASE, isLast ? DISABLED : INACTIVE)}
        aria-label="다음 페이지"
      >
        <ChevronDownIcon className="h-4 w-4 -rotate-90" />
      </button>
    </div>
  );
}
