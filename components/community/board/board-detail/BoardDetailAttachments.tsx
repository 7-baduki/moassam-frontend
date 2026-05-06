'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from '@/app/assets/icons';
import { cn } from '@/utils/cn';
import type { BoardDetailFile } from './board-detail.type';

interface BoardDetailAttachmentsProps {
  files: BoardDetailFile[];
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function getTotalSize(files: BoardDetailFile[]): number {
  return files.reduce((sum, f) => sum + f.size, 0);
}

export default function BoardDetailAttachments({ files }: BoardDetailAttachmentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mt-8 border-t border-black-200 pt-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-black-700"
        >
          <ChevronDownIcon className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
          첨부 {files.length}개 {formatFileSize(getTotalSize(files))}
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs text-black-500">파일 보안 검사 자동 진행</span>
          <button
            type="button"
            aria-label="전체 다운로드"
            className="flex cursor-pointer items-center text-black-600 hover:text-black-800"
          >
            {/* TODO: 다운로드 아이콘 필요 */}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-3 flex flex-wrap gap-2.5">
          {files.map((file) => (
            <a
              key={file.fileId}
              href={file.url}
              download={file.originalName}
              className="group relative flex w-[100px] flex-col overflow-hidden rounded-xl border border-black-200 bg-black-100 transition-colors hover:border-pink-400"
            >
              <div className="relative h-[70px] w-full shrink-0 bg-black-200">
                {file.fileType === 'IMAGE' ? (
                  <Image
                    src={file.url}
                    alt={file.originalName}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl">📄</div>
                )}
              </div>
              <div className="flex flex-col gap-0.5 p-2">
                <p className="line-clamp-1 text-[11px] font-medium text-black-700">
                  {file.originalName}
                </p>
                <p className="text-[10px] text-black-500">{formatFileSize(file.size)}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
