'use client';

import { useRef, useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { Button } from '@/components/common/button/Button';
import { UploadDragIcon, UploadXIcon } from '@/app/assets/icons';
import {
  FilePdfIcon,
  FilePngIcon,
  FileJpgIcon,
  FilePptIcon,
  FileDocIcon,
  FileDefaultIcon,
} from '@/app/assets/icons/editor';

const MAX_SIZE_MB = 10;

const FILE_ICON_BY_EXT: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  pdf: FilePdfIcon,
  png: FilePngIcon,
  jpg: FileJpgIcon,
  jpeg: FileJpgIcon,
  ppt: FilePptIcon,
  pptx: FilePptIcon,
  doc: FileDocIcon,
  docx: FileDocIcon,
};

function getFileIcon(fileName: string): ComponentType<SVGProps<SVGSVGElement>> {
  const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
  return FILE_ICON_BY_EXT[ext] ?? FileDefaultIcon;
}

interface WriteFileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

export default function WriteFileUpload({ files, onChange }: WriteFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);

  function addFiles(incoming: FileList | null) {
    if (!incoming || incoming.length === 0) return;
    onChange([...files, ...Array.from(incoming)]);
  }

  function removeFile(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => inputRef.current?.click()}
          className="border border-black-400 bg-white"
        >
          내 PC
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-black-500">
            현재 {formatBytes(totalBytes)} / 전체 {MAX_SIZE_MB}MB
          </span>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative h-25 overflow-y-auto rounded-lg border transition-colors ${files.length === 0 ? 'border-dashed' : ''} ${isDragging ? 'border-pink-500 bg-pink-50' : 'border-black-300 bg-white'}`}
      >
        {isDragging && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-pink-50">
            <p className="typo-line-m2 text-sm text-pink-500">업로드할 파일을 여기에 놓으세요</p>
          </div>
        )}
        {files.length === 0 ? (
          <div className="flex h-full items-center justify-center gap-1 text-sm text-black-700">
            <UploadDragIcon className="block" />
            <p className="typo-line-m2" aria-label="업로드 안내 문구">
              마우스로 파일을 끌어서 올리세요
            </p>
          </div>
        ) : (
          <table className="w-full text-xs leading-none">
            <thead className="sticky top-0 bg-black-100">
              <tr className="h-8 align-middle text-black-500">
                <th className="w-8 pl-3 align-middle">
                  <button
                    type="button"
                    onClick={() => onChange([])}
                    aria-label="모든 파일 삭제"
                    className="flex items-center justify-center"
                  >
                    <UploadXIcon width={16} height={16} className="block text-black-400" />
                  </button>
                </th>
                <th className="pl-2 text-left align-middle font-medium">파일명</th>
                <th className="pr-8 text-center align-middle font-medium">용량</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => {
                const FileIcon = getFileIcon(file.name);
                return (
                  <tr
                    key={index}
                    className="h-8 border-b border-black-100 align-middle last:border-none"
                  >
                    <td className="pl-3 align-middle">
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        aria-label={`${file.name} 삭제`}
                        className="flex items-center justify-center"
                      >
                        <UploadXIcon width={16} height={16} className="block" />
                      </button>
                    </td>
                    <td className="pl-2 align-middle text-sm text-black-800">
                      <span className="flex items-center gap-2">
                        <FileIcon width={16} height={16} className="shrink-0" />
                        {file.name}
                      </span>
                    </td>
                    <td className="pr-8 text-center align-middle text-xs text-black-600">
                      {formatBytes(file.size)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
