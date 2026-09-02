'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DownloadIcon } from '@/app/assets/icons';
import { toast } from '@/utils/toast';
import {
  FileDefaultIcon,
  FileDocIcon,
  FilePdfIcon,
  FilePngIcon,
  FilePptIcon,
  FileJpgIcon,
  DefaultPdfIcon,
  DefaultPngIcon,
  DefaultJpgIcon,
  DefaultJpegIcon,
  DefaultPptIcon,
  DefaultSvgIcon,
} from '@/app/assets/icons/editor';

const FILE_ICON_MAP: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  png: FilePngIcon,
  jpg: FileJpgIcon,
  jpeg: FileJpgIcon,
  pdf: FilePdfIcon,
  ppt: FilePptIcon,
  pptx: FilePptIcon,
  doc: FileDocIcon,
  docx: FileDocIcon,
};

const DEFAULT_THUMBNAIL_MAP: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  pdf: DefaultPdfIcon,
  png: DefaultPngIcon,
  jpg: DefaultJpgIcon,
  jpeg: DefaultJpegIcon,
  ppt: DefaultPptIcon,
  pptx: DefaultPptIcon,
  svg: DefaultSvgIcon,
};
import { formatFileSize } from '@/utils/formatFileSize';
import type { BoardDetailFile } from './board-detail.type';

const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

interface BoardDetailAttachmentCardProps {
  file: BoardDetailFile;
}

function getExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() ?? '';
}

async function downloadFile(url: string, fileName: string) {
  try {
    const params = new URLSearchParams({ url, filename: fileName });
    const response = await fetch(`/api/download?${params}`);
    if (!response.ok) {
      toast.error({ title: '다운로드 실패', description: '잠시 후 다시 시도해주세요' });
      return;
    }
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(objectUrl);
  } catch {
    toast.error({ title: '다운로드 실패', description: '잠시 후 다시 시도해주세요' });
  }
}

export default function BoardDetailAttachmentCard({ file }: BoardDetailAttachmentCardProps) {
  const ext = getExtension(file.originalName);
  const isImage = IMAGE_EXTS.includes(ext);
  const FileIcon = FILE_ICON_MAP[ext] ?? FileDefaultIcon;
  const ThumbnailIcon = DEFAULT_THUMBNAIL_MAP[ext] ?? FileDefaultIcon;
  const [isActive, setIsActive] = useState(false);

  const overlayVisible = isActive
    ? 'visible pointer-events-auto opacity-100'
    : 'invisible pointer-events-none opacity-0 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100';

  function handleCardClick() {
    setIsActive((v) => !v);
  }

  function handleCardKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsActive((v) => !v);
      return;
    }

    if (e.key === 'Escape') {
      setIsActive(false);
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`${file.originalName} 첨부파일 메뉴 ${isActive ? '닫기' : '열기'}`}
      className="group relative h-30 w-45 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-black-300 bg-black-200"
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      {isImage ? (
        <Image src={file.url} alt={file.originalName} fill className="object-cover" sizes="180px" />
      ) : (
        <div
          className={`flex h-full flex-col transition-opacity group-hover:opacity-0 ${isActive ? 'opacity-0' : ''}`}
        >
          <div className="flex flex-1 items-center justify-center bg-white">
            <ThumbnailIcon width={48} height={48} />
          </div>
          <div className="flex h-12.5 flex-col justify-center gap-0.5 bg-black-100 px-2.5">
            <span className="typo-line-p2 text-[11px] font-medium text-black-600">
              {formatFileSize(file.size)}
            </span>
            <div className="flex items-center gap-1">
              <span className="typo-line-m2 truncate text-xs font-semibold text-black-800">
                {file.originalName.replace(/\.[^/.]+$/, '')}
              </span>
              <span className="typo-line-p2 shrink-0 text-xs font-medium text-black-500">
                {ext}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className={`absolute inset-0 bg-[#00000099] transition-opacity ${overlayVisible}`} />

      <div
        className={`absolute inset-0 flex flex-col justify-between p-2 transition-opacity ${overlayVisible}`}
      >
        <div className="flex items-start justify-between">
          <FileIcon className="h-5 w-5 text-white" />
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="다운로드"
              className="flex cursor-pointer items-center hover:opacity-80 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-white"
              onClick={(e) => {
                e.stopPropagation();
                void downloadFile(file.url, file.originalName);
              }}
            >
              <DownloadIcon className="h-5 w-5 brightness-0 invert" />
            </button>
          </div>
        </div>

        <div className="flex items-end gap-1.25">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="typo-line-p2 text-[11px] font-medium text-white">
              {formatFileSize(file.size)}
            </span>
            <span className="typo-line-m2 truncate text-xs font-semibold text-white">
              {file.originalName.replace(/\.[^/.]+$/, '')}
            </span>
          </div>
          <span className="typo-line-p2 shrink-0 text-xs font-medium text-white">{ext}</span>
        </div>
      </div>
    </div>
  );
}
