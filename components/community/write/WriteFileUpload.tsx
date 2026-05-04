'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/common/button/Button';
import { UploadDragIcon, UploadXIcon } from '@/app/assets/icons';

const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

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
    if (!incoming) return;
    const next = [...files, ...Array.from(incoming)];
    const nextBytes = next.reduce((sum, file) => sum + file.size, 0);
    if (nextBytes > MAX_SIZE_BYTES) return;
    onChange(next);
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
        <span className="text-sm text-black-500">
          현재 {formatBytes(totalBytes)} / 전체 {MAX_SIZE_MB}MB
        </span>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative h-35 overflow-y-auto rounded-lg border border-black-300 transition-colors ${isDragging ? 'border-dashed border-pink-500 bg-pink-50' : 'bg-white'}`}
      >
        {isDragging && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-pink-50">
            <p className="text-base font-semibold text-pink-500">업로드할 파일을 여기에 놓으세요</p>
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
              <tr className="h-8 border-b border-black-200 align-middle text-black-500">
                <th className="w-8 pl-3 align-middle">
                  <button
                    type="button"
                    onClick={() => onChange([])}
                    className="flex items-center justify-center"
                  >
                    <UploadXIcon width={16} height={16} className="block text-black-400" />
                  </button>
                </th>
                <th className="text-left align-middle font-medium">파일명</th>
                <th className="pr-8 text-center align-middle font-medium">용량</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr
                  key={index}
                  className="h-8 border-b border-black-100 align-middle last:border-none"
                >
                  <td className="pl-3 align-middle">
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="flex items-center justify-center"
                    >
                      <UploadXIcon width={16} height={16} className="block" />
                    </button>
                  </td>
                  <td className="align-middle text-sm text-black-800">{file.name}</td>
                  <td className="pr-8 text-center align-middle text-xs text-black-600">
                    {formatBytes(file.size)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
