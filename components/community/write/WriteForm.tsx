'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { toast } from '@/utils/toast';
import CommunityTitleBar from '@/components/community/CommunityTitleBar';
import WriteCategorySelect from './WriteCategorySelect';
import WriteTitleInput from './WriteTitleInput';
import WriteFileUpload from './WriteFileUpload';
import type { BoardType, WriteFormValues } from './write.type';

const MAX_FILES_BYTES = 10 * 1024 * 1024;

const WriteEditor = dynamic(() => import('./WriteEditor'), {
  ssr: false,
  loading: () => (
    <div className="h-90.75 animate-pulse rounded-lg border border-black-200 bg-black-100" />
  ),
});

interface WriteFormProps {
  initialBoard: BoardType;
}

export default function WriteForm({ initialBoard }: WriteFormProps) {
  const [values, setValues] = useState<WriteFormValues>({
    boardType: initialBoard,
    title: '',
    content: '',
    files: [],
  });

  function handleChange<K extends keyof WriteFormValues>(key: K, value: WriteFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    const totalFilesBytes = values.files.reduce((sum, file) => sum + file.size, 0);
    if (totalFilesBytes > MAX_FILES_BYTES) {
      toast.warning({ title: '업로드 제한', description: '파일은 최대 10MB까지만 가능합니다' });
      return;
    }
    // TODO: API 연결
    console.log(values);
  }

  return (
    <div className="flex flex-col">
      <CommunityTitleBar title="새글작성" hideSearch onWrite={handleSubmit} />
      <div className="mt-2">
        <WriteCategorySelect values={values} onChange={handleChange} />
      </div>
      <div className="mt-2">
        <WriteTitleInput value={values.title} onChange={(value) => handleChange('title', value)} />
      </div>
      <div className="mt-7.5">
        <WriteFileUpload files={values.files} onChange={(files) => handleChange('files', files)} />
      </div>
      <div className="mt-7.5">
        <WriteEditor
          value={values.content}
          onChange={(content) => handleChange('content', content)}
        />
      </div>
    </div>
  );
}
