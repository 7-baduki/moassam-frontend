'use client';

import { useRef, useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { Button } from '@/components/common/button/Button';
import { toast } from '@/utils/toast';
import { UploadDragIcon, UploadXIcon } from '@/app/assets/icons';
import {
  FilePdfIcon,
  FilePngIcon,
  FileJpgIcon,
  FilePptIcon,
  FileDocIcon,
  FileDefaultIcon,
} from '@/app/assets/icons/editor';
import type { BoardDetailFile } from '@/components/community/board/board-detail/board-detail.type';

const MAX_SIZE_MB = 10;
const MAX_FILES = 5;

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
  existingFiles?: BoardDetailFile[];
  onDeleteExistingFile?: (fileId: number) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

export default function WriteFileUpload({
  files,
  onChange,
  existingFiles = [],
  onDeleteExistingFile,
}: WriteFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const totalBytes =
    files.reduce((sum, file) => sum + file.size, 0) +
    existingFiles.reduce((sum, file) => sum + file.size, 0);
  const hasAnyFile = existingFiles.length > 0 || files.length > 0;

  function addFiles(incoming: FileList | null) {
    if (!incoming || incoming.length === 0) return;
    const totalCount = existingFiles.length + files.length + incoming.length;
    if (totalCount > MAX_FILES) {
      toast.warning({
        title: '업로드 제한',
        description: `파일은 최대 ${MAX_FILES}개까지만 첨부할 수 있습니다`,
      });
      return;
    }
    const added = Array.from(incoming);
    onChange([...files, ...added]);
  }

  function removeFile(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  function handleDragEnter() {
    dragCounter.current++;
    setIsDragging(true);
  }

  function handleDragLeave() {
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current = 0;
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
          <span className="text-xs text-black-500">
            현재 {totalBytes < 1024 * 1024 * 0.1 ? '0' : (totalBytes / (1024 * 1024)).toFixed(1)}MB
            / 전체 {MAX_SIZE_MB}MB
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
        className="relative"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-lg border-2 border-dashed border-pink-500"
            style={{ background: 'rgba(255, 241, 242, 0.95)' }}
          >
            <p className="typo-line-m2 text-sm text-pink-500">업로드할 파일을 여기에 놓으세요</p>
          </div>
        )}
        <div
          className="h-34.5 overflow-y-auto rounded-lg bg-white transition-colors"
          style={
            !isDragging && !hasAnyFile
              ? {
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23e2e2e2' stroke-width='1.5' stroke-dasharray='8%2c6' stroke-linecap='square'/%3e%3c/svg%3e")`,
                }
              : isDragging
                ? { border: '2px dashed #FF7B84' }
                : { border: '1px solid #e2e2e2' }
          }
        >
          {!hasAnyFile ? (
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
                      onClick={() => {
                        onChange([]);
                        existingFiles.forEach((f) => onDeleteExistingFile?.(f.fileId));
                      }}
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
                {existingFiles.map((file) => {
                  const FileIcon = getFileIcon(file.originalName);
                  return (
                    <tr key={`existing-${file.fileId}`} className="h-8 align-middle">
                      <td className="pl-3 align-middle">
                        <button
                          type="button"
                          onClick={() => onDeleteExistingFile?.(file.fileId)}
                          aria-label={`${file.originalName} 삭제`}
                          className="flex items-center justify-center"
                        >
                          <UploadXIcon width={16} height={16} className="block" />
                        </button>
                      </td>
                      <td className="pl-2 align-middle text-sm text-black-800">
                        <span className="flex items-center gap-2">
                          <FileIcon width={16} height={16} className="shrink-0" />
                          {file.originalName}
                        </span>
                      </td>
                      <td className="pr-8 text-center align-middle text-xs text-black-600">
                        {formatBytes(file.size)}
                      </td>
                    </tr>
                  );
                })}
                {files.map((file, index) => {
                  const FileIcon = getFileIcon(file.name);
                  return (
                    <tr key={`new-${index}`} className="h-8 align-middle">
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
    </div>
  );
}
