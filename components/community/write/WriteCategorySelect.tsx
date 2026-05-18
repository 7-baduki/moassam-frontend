'use client';

import { Select } from '@/components/common/select';
import { AGE_OPTIONS, BOARD_OPTIONS, MATERIAL_TYPE_OPTIONS, TOPIC_OPTIONS } from './write-selects';
import type { WriteFormValues } from './write.type';

interface WriteCategorySelectProps {
  values: Pick<WriteFormValues, 'boardType' | 'postAge' | 'resourceType' | 'headTag'>;
  onChange: <K extends keyof WriteFormValues>(key: K, value: WriteFormValues[K]) => void;
}

export default function WriteCategorySelect({ values, onChange }: WriteCategorySelectProps) {
  const { boardType, postAge, resourceType, headTag } = values;

  const handleBoardTypeChange = (value: string) => {
    if (value !== 'moabang' && value !== 'free') return;

    onChange('boardType', value);
    onChange('postAge', undefined);
    onChange('resourceType', undefined);
    onChange('headTag', undefined);
  };

  const isFree = boardType === 'free';

  return (
    <div className={isFree ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-2 gap-3 md:flex'}>
      <Select
        size="md"
        className={
          isFree
            ? 'col-span-2 w-full bg-white md:col-span-1'
            : 'col-span-2 w-full bg-white md:flex-1'
        }
        triggerLabel={BOARD_OPTIONS.find((o) => o.value === boardType)?.label ?? '게시판'}
        options={BOARD_OPTIONS}
        value={boardType}
        onChange={handleBoardTypeChange}
      />
      {boardType === 'moabang' && (
        <>
          <Select
            size="md"
            className="w-full bg-white md:flex-1"
            triggerLabel={AGE_OPTIONS.find((o) => o.value === postAge)?.label ?? '연령'}
            options={AGE_OPTIONS}
            value={postAge}
            onChange={(value) => onChange('postAge', value as WriteFormValues['postAge'])}
          />
          <Select
            size="md"
            className="w-full bg-white md:flex-1"
            triggerLabel={
              MATERIAL_TYPE_OPTIONS.find((o) => o.value === resourceType)?.label ?? '자료 유형'
            }
            options={MATERIAL_TYPE_OPTIONS}
            value={resourceType}
            onChange={(value) => onChange('resourceType', value as WriteFormValues['resourceType'])}
          />
        </>
      )}
      {boardType === 'free' && (
        <Select
          size="md"
          className="col-span-2 w-full bg-white md:col-span-1"
          triggerLabel={TOPIC_OPTIONS.find((o) => o.value === headTag)?.label ?? '말머리'}
          options={TOPIC_OPTIONS}
          value={headTag}
          onChange={(value) => onChange('headTag', value as WriteFormValues['headTag'])}
        />
      )}
    </div>
  );
}
