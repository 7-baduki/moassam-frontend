'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@/app/assets/icons';
import { Select } from '@/components/common/select';
import { SelectBottomSheet } from '@/components/common/bottom-sheet/SelectBottomSheet';
import { useIsMobile } from '@/hooks/useIsMobile';
import { AGE_OPTIONS, BOARD_OPTIONS, MATERIAL_TYPE_OPTIONS, TOPIC_OPTIONS } from './write-selects';
import type { WriteFormValues } from './write.type';

interface WriteCategorySelectProps {
  values: Pick<WriteFormValues, 'boardType' | 'postAge' | 'resourceType' | 'headTag'>;
  onChange: <K extends keyof WriteFormValues>(key: K, value: WriteFormValues[K]) => void;
}

export default function WriteCategorySelect({ values, onChange }: WriteCategorySelectProps) {
  const { boardType, postAge, resourceType, headTag } = values;
  const isMobile = useIsMobile();

  const [boardOpen, setBoardOpen] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);
  const [headTagOpen, setHeadTagOpen] = useState(false);

  const handleBoardTypeChange = (value: string) => {
    if (value !== 'moabang' && value !== 'free') return;
    onChange('boardType', value);
    onChange('postAge', undefined);
    onChange('resourceType', undefined);
    onChange('headTag', undefined);
  };

  const isFree = boardType === 'free';

  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setBoardOpen(true)}
          className="col-span-2 flex w-full items-center justify-between rounded-lg border border-black-300 bg-white p-2.5 text-sm font-medium text-black-800"
        >
          <span>{BOARD_OPTIONS.find((o) => o.value === boardType)?.label ?? '게시판'}</span>
          <ChevronDownIcon width={20} height={20} className="shrink-0" />
        </button>

        {boardType === 'moabang' && (
          <>
            <button
              type="button"
              onClick={() => setAgeOpen(true)}
              className="flex w-full items-center justify-between rounded-lg border border-black-300 bg-white p-2.5 text-sm font-medium text-black-800"
            >
              <span>{AGE_OPTIONS.find((o) => o.value === postAge)?.label ?? '연령'}</span>
              <ChevronDownIcon width={20} height={20} className="shrink-0" />
            </button>
            <button
              type="button"
              onClick={() => setResourceOpen(true)}
              className="flex w-full items-center justify-between rounded-lg border border-black-300 bg-white p-2.5 text-sm font-medium text-black-800"
            >
              <span>
                {MATERIAL_TYPE_OPTIONS.find((o) => o.value === resourceType)?.label ?? '자료 유형'}
              </span>
              <ChevronDownIcon width={20} height={20} className="shrink-0" />
            </button>
          </>
        )}

        {boardType === 'free' && (
          <button
            type="button"
            onClick={() => setHeadTagOpen(true)}
            className="col-span-2 flex w-full items-center justify-between rounded-lg border border-black-300 bg-white p-2.5 text-sm font-medium text-black-800"
          >
            <span>{TOPIC_OPTIONS.find((o) => o.value === headTag)?.label ?? '말머리'}</span>
            <ChevronDownIcon width={20} height={20} className="shrink-0" />
          </button>
        )}

        <SelectBottomSheet
          open={boardOpen}
          onOpenChange={setBoardOpen}
          title="게시판"
          options={BOARD_OPTIONS}
          value={boardType}
          onChange={handleBoardTypeChange}
          onConfirm={() => setBoardOpen(false)}
        />
        <SelectBottomSheet
          open={ageOpen}
          onOpenChange={setAgeOpen}
          title="연령"
          options={AGE_OPTIONS}
          value={postAge}
          onChange={(value) => onChange('postAge', value as WriteFormValues['postAge'])}
          onConfirm={() => setAgeOpen(false)}
        />
        <SelectBottomSheet
          open={resourceOpen}
          onOpenChange={setResourceOpen}
          title="자료 유형"
          options={MATERIAL_TYPE_OPTIONS}
          value={resourceType}
          onChange={(value) => onChange('resourceType', value as WriteFormValues['resourceType'])}
          onConfirm={() => setResourceOpen(false)}
        />
        <SelectBottomSheet
          open={headTagOpen}
          onOpenChange={setHeadTagOpen}
          title="말머리"
          options={TOPIC_OPTIONS}
          value={headTag}
          onChange={(value) => onChange('headTag', value as WriteFormValues['headTag'])}
          onConfirm={() => setHeadTagOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className={isFree ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-2 gap-3 md:flex'}>
      <Select
        size="md"
        className={isFree ? 'col-span-2 w-full md:col-span-1' : 'col-span-2 w-full md:flex-1'}
        triggerLabel={BOARD_OPTIONS.find((o) => o.value === boardType)?.label ?? '게시판'}
        options={BOARD_OPTIONS}
        value={boardType}
        onChange={handleBoardTypeChange}
      />
      {boardType === 'moabang' && (
        <>
          <Select
            size="md"
            className="w-full md:flex-1"
            triggerLabel={AGE_OPTIONS.find((o) => o.value === postAge)?.label ?? '연령'}
            options={AGE_OPTIONS}
            value={postAge}
            onChange={(value) => onChange('postAge', value as WriteFormValues['postAge'])}
          />
          <Select
            size="md"
            className="w-full md:flex-1"
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
          className="col-span-2 w-full md:col-span-1"
          triggerLabel={TOPIC_OPTIONS.find((o) => o.value === headTag)?.label ?? '말머리'}
          options={TOPIC_OPTIONS}
          value={headTag}
          onChange={(value) => onChange('headTag', value as WriteFormValues['headTag'])}
        />
      )}
    </div>
  );
}
