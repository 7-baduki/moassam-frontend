'use client';

import { useState } from 'react';
import { Select } from '@/components/common/select/Select';
import { Textarea } from '@/components/common/textarea/Textarea';
import { Button } from '@/components/common/button/Button';
import type { SelectOption } from '@/components/common/select/select.type';

const AGE_OPTIONS: SelectOption[] = [
  { label: '만 0세', value: '0' },
  { label: '만 1세', value: '1' },
  { label: '만 2세', value: '2' },
  { label: '만 3세', value: '3' },
  { label: '만 4세', value: '4' },
  { label: '만 5세', value: '5' },
];

const AREA_OPTIONS: SelectOption[] = [
  { label: '신체 운동·건강', value: 'physical' },
  { label: '의사소통', value: 'communication' },
  { label: '사회관계', value: 'social' },
  { label: '예술경험', value: 'art' },
  { label: '자연탐구', value: 'nature' },
];

export default function ObservationCreateForm() {
  const [age, setAge] = useState('');
  const [areas, setAreas] = useState<string[]>([]);
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    // TODO: API 연동
  };

  return (
    <div className="flex flex-col items-center px-20 pt-25">
      <div className="mb-12.5 text-center">
        <h1 className="text-xl font-semibold text-black">관찰일지를 완성해보세요!</h1>
        <p className="mt-0.5 text-sm font-medium text-black">
          간단한 입력으로 영유아의 행동을 기록할 수 있어요
        </p>
      </div>

      <h2 className="mb-5 w-full max-w-350 text-lg font-semibold text-black">관찰일지 맞춤 검색</h2>

      <div className="w-full max-w-350 rounded-[20px] bg-white px-12.5 py-11.75">
        <section className="mb-5">
          <h2 className="mb-5 text-lg font-semibold text-black-800">기본정보</h2>
          <div className="flex gap-15">
            <Select
              size="md"
              options={AGE_OPTIONS}
              triggerLabel="연령"
              value={age}
              onChange={setAge}
            />
            <Select
              multiple
              size="md"
              options={AREA_OPTIONS}
              triggerLabel="5개 영역"
              value={areas}
              onChange={setAreas}
            />
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-lg font-semibold text-black-800">관찰상황 입력</h2>
          <Textarea
            placeholder="영유아의 행동이나 상황을 구체적인 문장으로 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            action={
              <Button size="md" onClick={handleSubmit}>
                생성하기
              </Button>
            }
          />
        </section>
      </div>
    </div>
  );
}
