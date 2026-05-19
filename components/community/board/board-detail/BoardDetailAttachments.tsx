'use client';

import { useState } from 'react';
import { ChevronDownIcon, DownloadIcon } from '@/app/assets/icons';
import { cn } from '@/utils/cn';
import { formatFileSize } from '@/utils/formatFileSize';
import BoardDetailAttachmentCard from './BoardDetailAttachmentCard';
import type { BoardDetailFile } from './board-detail.type';

interface BoardDetailAttachmentsProps {
  files: BoardDetailFile[];
}

function getTotalSize(files: BoardDetailFile[]): number {
  return files.reduce((sum, f) => sum + f.size, 0);
}

export default function BoardDetailAttachments({ files }: BoardDetailAttachmentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mt-5 border-t border-black-200 pt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex cursor-pointer items-center"
            aria-label="첨부파일 토글"
          >
            <ChevronDownIcon
              className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
            />
          </button>
          <span className="typo-line-p2 text-sm font-semibold text-black-800">
            첨부 {files.length}개
          </span>
          <span className="typo-line-p2 text-xs font-medium text-black-600">
            {formatFileSize(getTotalSize(files))}
          </span>
          <button
            type="button"
            aria-label="전체 다운로드"
            className="flex items-center text-black-600 hover:text-black-800"
          >
            <DownloadIcon />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-3 flex flex-wrap gap-2.5">
          {files.map((file) => (
            <BoardDetailAttachmentCard key={file.fileId} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}
