'use client';

import { XIcon } from '@/app/assets/icons';
import {
  FilePdfIcon,
  FilePngIcon,
  FileJpgIcon,
  FilePptIcon,
  FileDocIcon,
  FileDefaultIcon,
} from '@/app/assets/icons/editor';
import { formatFileSize } from '@/utils/formatFileSize';

const FILE_ICON_MAP: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  pdf: FilePdfIcon,
  png: FilePngIcon,
  jpg: FileJpgIcon,
  jpeg: FileJpgIcon,
  ppt: FilePptIcon,
  pptx: FilePptIcon,
  doc: FileDocIcon,
  docx: FileDocIcon,
};

interface WriteFileCardProps {
  fileName: string;
  size: number;
  onRemove: () => void;
}

function getExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() ?? '';
}

export default function WriteFileCard({ fileName, size, onRemove }: WriteFileCardProps) {
  const ext = getExtension(fileName);
  const FileIcon = FILE_ICON_MAP[ext] ?? FileDefaultIcon;
  const baseName = fileName.replace(/\.[^/.]+$/, '');

  return (
    <div className="relative flex h-19.25 w-full flex-col justify-between overflow-hidden rounded-xl border border-black-200 bg-black-100 p-2">
      <div className="flex items-start justify-between">
        <FileIcon className="h-5 w-5" />
        <button
          type="button"
          onClick={onRemove}
          aria-label={`${fileName} 삭제`}
          className="flex h-5 w-5 items-center justify-center hover:opacity-70"
        >
          <XIcon className="h-4 w-4 text-black-600" />
        </button>
      </div>
      <div className="flex items-end gap-1">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[10px] font-medium text-black-600">{formatFileSize(size)}</span>
          <span className="truncate text-xs font-semibold text-black-800">{baseName}</span>
        </div>
        <span className="shrink-0 text-xs font-medium text-black-800">{ext}</span>
      </div>
    </div>
  );
}
