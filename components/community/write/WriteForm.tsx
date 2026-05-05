'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
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
    // TODO: API 연결
    console.log(values);
  }

  const totalFilesBytes = values.files.reduce((sum, file) => sum + file.size, 0);
  const isOverFileLimit = totalFilesBytes > MAX_FILES_BYTES;

  return (
    <div className="flex flex-col gap-4">
      <CommunityTitleBar
        title="새글작성"
        description="자유게시판 글 작성 시 1회, 모아방 자료 업로드 시 3회 AI 생성 횟수가 충전돼요."
        hideSearch
        onWrite={handleSubmit}
        writeDisabled={isOverFileLimit}
      />
      <WriteCategorySelect values={values} onChange={handleChange} />
      <WriteTitleInput value={values.title} onChange={(value) => handleChange('title', value)} />
      <WriteFileUpload files={values.files} onChange={(files) => handleChange('files', files)} />
      <WriteEditor
        value={values.content}
        onChange={(content) => handleChange('content', content)}
      />
    </div>
  );
}
