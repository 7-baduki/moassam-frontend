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
        triggerLabel="게시판"
        options={BOARD_OPTIONS}
        value={boardType}
        onChange={handleBoardTypeChange}
      />
      {boardType === 'moabang' && (
        <>
          <Select
            size="md"
            triggerLabel="연령"
            options={AGE_OPTIONS}
            value={age}
            onChange={(value) => onChange('age', value)}
          />
          <Select
            size="md"
            triggerLabel="자료 유형"
            options={MATERIAL_TYPE_OPTIONS}
            value={materialType}
            onChange={(value) => onChange('materialType', value)}
          />
        </>
      )}
      {boardType === 'free' && (
        <Select
          size="md"
          triggerLabel="말머리"
          options={TOPIC_OPTIONS}
          value={topic}
          onChange={(value) => onChange('topic', value)}
        />
      )}
    </div>
  );
}
