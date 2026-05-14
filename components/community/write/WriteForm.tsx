'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { toast } from '@/utils/toast';
import CommunityTitleBar from '@/components/community/CommunityTitleBar';
import WriteCategorySelect from './WriteCategorySelect';
import WriteTitleInput from './WriteTitleInput';
import WriteFileUpload from './WriteFileUpload';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '@/hooks/queries/community/useCommunity';
import type { BoardType, WriteFormValues } from './write.type';
import type { BoardDetailFile } from '@/components/community/board/board-detail/board-detail.type';

const MAX_FILES_BYTES = 10 * 1024 * 1024;

const WriteEditor = dynamic(() => import('./WriteEditor'), {
  ssr: false,
  loading: () => (
    <div className="h-90.75 animate-pulse rounded-lg border border-black-200 bg-black-100" />
  ),
});

interface WriteFormProps {
  initialBoard: BoardType;
  mode?: 'create' | 'edit';
  postId?: number;
  initialValues?: Partial<Omit<WriteFormValues, 'files' | 'boardType'>>;
  initialExistingFiles?: BoardDetailFile[];
}

export default function WriteForm({
  initialBoard,
  mode = 'create',
  postId,
  initialValues,
  initialExistingFiles = [],
}: WriteFormProps) {
  const router = useRouter();
  const isEdit = mode === 'edit';

  const { mutate: createPost, isPending: isCreating } = useCreatePostMutation();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePostMutation(postId ?? 0);

  const isPending = isCreating || isUpdating;

  const [values, setValues] = useState<WriteFormValues>({
    boardType: initialBoard,
    title: initialValues?.title ?? '',
    content: initialValues?.content ?? '',
    files: [],
    postAge: initialValues?.postAge,
    resourceType: initialValues?.resourceType,
    headTag: initialValues?.headTag,
  });

  const [existingFiles, setExistingFiles] = useState<BoardDetailFile[]>(initialExistingFiles);
  const [deleteFileIds, setDeleteFileIds] = useState<number[]>([]);

  function handleChange<K extends keyof WriteFormValues>(key: K, value: WriteFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleDeleteExistingFile(fileId: number) {
    setDeleteFileIds((prev) => [...prev, fileId]);
    setExistingFiles((prev) => prev.filter((f) => f.fileId !== fileId));
  }

  function handleSubmit() {
    if (values.title.trim().length === 0) {
      toast.warning({ title: '입력 확인', description: '제목을 입력해주세요' });
      return;
    }

    const hasText = values.content.replace(/<[^>]*>/g, '').trim().length > 0;
    const hasImage = /<img/i.test(values.content);
    if (!hasText && !hasImage) {
      toast.warning({ title: '입력 확인', description: '내용을 입력해주세요' });
      return;
    }

    if (values.boardType === 'moabang') {
      if (!values.postAge) {
        toast.warning({ title: '입력 확인', description: '연령을 선택해주세요' });
        return;
      }
      if (!values.resourceType) {
        toast.warning({ title: '입력 확인', description: '자료 유형을 선택해주세요' });
        return;
      }
    }

    if (values.boardType === 'free' && !values.headTag) {
      toast.warning({ title: '입력 확인', description: '말머리를 선택해주세요' });
      return;
    }

    const totalFilesBytes = values.files.reduce((sum, file) => sum + file.size, 0);
    if (totalFilesBytes > MAX_FILES_BYTES) {
      toast.warning({ title: '업로드 제한', description: '파일은 최대 10MB까지만 가능합니다' });
      return;
    }

    const category = values.boardType === 'moabang' ? 'MOABANG' : 'FREE';
    const path = values.boardType === 'moabang' ? 'moabang' : 'board';
    const content = values.content;

    if (isEdit && postId != null) {
      const request = {
        category,
        postAge: values.postAge ?? null,
        resourceType: values.resourceType ?? null,
        headTag: values.headTag ?? null,
        title: values.title,
        content,
        deleteFileIds,
      } as const;

      updatePost(
        { request, files: values.files },
        {
          onSuccess: ({ postId: updatedPostId }) => {
            router.push(`/community/${path}/${updatedPostId}`);
          },
          onError: () => {
            toast.error({ title: '게시글 수정 실패', description: '잠시 후 다시 시도해주세요' });
          },
        },
      );
    } else {
      const request = {
        category,
        postAge: values.postAge ?? null,
        resourceType: values.resourceType ?? null,
        headTag: values.headTag ?? null,
        title: values.title,
        content,
      } as const;

      createPost(
        { request, files: values.files },
        {
          onSuccess: ({ postId: createdPostId }) => {
            router.push(`/community/${path}/${createdPostId}`);
          },
          onError: () => {
            toast.error({ title: '게시글 등록 실패', description: '잠시 후 다시 시도해주세요' });
          },
        },
      );
    }
  }

  return (
    <div className="flex flex-col">
      <CommunityTitleBar
        title={isEdit ? '게시글 수정' : '새글작성'}
        writeLabel={isEdit ? '수정완료' : '새글작성'}
        hideSearch
        onWrite={handleSubmit}
        writeDisabled={isPending}
      />
      <div className="mt-2">
        <WriteCategorySelect values={values} onChange={handleChange} />
      </div>
      <div className="mt-2">
        <WriteTitleInput value={values.title} onChange={(value) => handleChange('title', value)} />
      </div>
      <div className="mt-7.5">
        <WriteFileUpload
          files={values.files}
          onChange={(files) => handleChange('files', files)}
          existingFiles={existingFiles}
          onDeleteExistingFile={handleDeleteExistingFile}
        />
      </div>
      <div className="mt-7.5">
        <WriteEditor value={values.content} onChange={(value) => handleChange('content', value)} />
      </div>
    </div>
  );
}
