'use client';

import { Select } from '@/components/common/select';
import { AGE_OPTIONS, BOARD_OPTIONS, MATERIAL_TYPE_OPTIONS, TOPIC_OPTIONS } from './write-selects';
import type { BoardType, WriteFormValues } from './write.type';

interface WriteCategorySelectProps {
  values: Pick<WriteFormValues, 'boardType' | 'age' | 'materialType' | 'topic'>;
  onChange: <K extends keyof WriteFormValues>(key: K, value: WriteFormValues[K]) => void;
}

export default function WriteCategorySelect({ values, onChange }: WriteCategorySelectProps) {
  const { boardType, age, materialType, topic } = values;

  function handleBoardTypeChange(value: string) {
    onChange('boardType', value as BoardType);
    onChange('age', undefined);
    onChange('materialType', undefined);
    onChange('topic', undefined);
  }

  return (
    <div className="flex gap-3">
      <Select
        size="md"
        className="bg-white"
        triggerLabel={BOARD_OPTIONS.find((o) => o.value === boardType)?.label ?? '게시판'}
        options={BOARD_OPTIONS}
        value={boardType}
        onChange={handleBoardTypeChange}
      />
      {boardType === 'moabang' && (
        <>
          <Select
            size="md"
            className="bg-white"
            triggerLabel={AGE_OPTIONS.find((o) => o.value === age)?.label ?? '연령'}
            options={AGE_OPTIONS}
            value={age}
            onChange={(value) => onChange('age', value)}
          />
          <Select
            size="md"
            className="bg-white"
            triggerLabel={
              MATERIAL_TYPE_OPTIONS.find((o) => o.value === materialType)?.label ?? '자료 유형'
            }
            options={MATERIAL_TYPE_OPTIONS}
            value={materialType}
            onChange={(value) => onChange('materialType', value)}
          />
        </>
      )}
      {boardType === 'free' && (
        <Select
          size="md"
          className="bg-white"
          triggerLabel={TOPIC_OPTIONS.find((o) => o.value === topic)?.label ?? '말머리'}
          options={TOPIC_OPTIONS}
          value={topic}
          onChange={(value) => onChange('topic', value)}
        />
      )}
    </div>
  );
}
