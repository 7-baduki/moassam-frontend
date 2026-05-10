'use client';

import { Input } from '@/components/common/input/Input';

interface WriteTitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function WriteTitleInput({ value, onChange }: WriteTitleInputProps) {
  return (
    <Input
      placeholder="제목을 입력해주세요"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClear={() => onChange('')}
      className="bg-white [&_input]:text-black-800"
    />
  );
}
