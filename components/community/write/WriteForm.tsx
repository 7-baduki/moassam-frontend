'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import WriteCategorySelect from './WriteCategorySelect';
import WriteTitleInput from './WriteTitleInput';
import WriteFileUpload from './WriteFileUpload';
import type { BoardType, WriteFormValues } from './write.type';

const WriteEditor = dynamic(() => import('./WriteEditor'), {
  ssr: false,
  loading: () => (
    <div className="h-[363px] animate-pulse rounded-lg border border-black-200 bg-black-100" />
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

  return (
    <div className="flex flex-col gap-4">
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
