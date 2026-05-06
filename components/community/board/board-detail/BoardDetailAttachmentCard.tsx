'use client';

import Image from 'next/image';
import { DownloadIcon, XIcon } from '@/app/assets/icons';
import {
  FileDefaultIcon,
  FileDocIcon,
  FilePdfIcon,
  FilePngIcon,
  FilePptIcon,
  FileJpgIcon,
} from '@/app/assets/icons/editor';
import { formatFileSize } from '@/utils/formatFileSize';
import type { BoardDetailFile } from './board-detail.type';

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

interface BoardDetailAttachmentCardProps {
  file: BoardDetailFile;
}

function getExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() ?? '';
}

export default function BoardDetailAttachmentCard({ file }: BoardDetailAttachmentCardProps) {
  const ext = getExtension(file.originalName);
  const FileIcon = FILE_ICON_MAP[ext] ?? FileDefaultIcon;

  return (
    <div className="group relative h-[120px] w-[180px] shrink-0 cursor-pointer overflow-hidden rounded-xl bg-black-200">
      {file.fileType === 'IMAGE' ? (
        <Image src={file.url} alt={file.originalName} fill className="object-cover" sizes="180px" />
      ) : (
        <div className="flex h-full items-center justify-center text-4xl">📄</div>
      )}

      {/* 호버 오버레이 */}
      <div className="absolute inset-0 bg-[#00000099] opacity-0 transition-opacity group-hover:opacity-100" />

      {/* 호버 콘텐츠 */}
      <div className="absolute inset-0 flex flex-col justify-between p-2 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="flex items-start justify-between">
          <FileIcon className="h-5 w-5 text-white" />
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="다운로드"
              className="flex cursor-pointer items-center outline-none hover:opacity-80"
            >
              <DownloadIcon className="h-5 w-5 brightness-0 invert" />
            </button>
            <button
              type="button"
              aria-label="삭제"
              className="flex h-5 w-5 cursor-pointer items-center justify-center overflow-hidden text-white outline-none hover:opacity-80"
            >
              <XIcon />
            </button>
          </div>
        </div>

        <div className="flex items-end gap-[5px]">
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
