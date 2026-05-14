'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { toast } from '@/utils/toast';
import { UploadXIcon } from '@/app/assets/icons';
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
    const totalFilesBytes = values.files.reduce((sum, file) => sum + file.size, 0);
    if (totalFilesBytes > MAX_FILES_BYTES) {
      toast.warning({ title: '업로드 제한', description: '파일은 최대 10MB까지만 가능합니다' });
      return;
    }

    const category = values.boardType === 'moabang' ? 'MOABANG' : 'FREE';
    const path = values.boardType === 'moabang' ? 'moabang' : 'board';

    if (isEdit && postId != null) {
      const request = {
        category,
        postAge: values.postAge ?? null,
        resourceType: values.resourceType ?? null,
        headTag: values.headTag ?? null,
        title: values.title,
        content: values.content,
        deleteFileIds,
      } as const;

      updatePost(
        { request, files: values.files, editorImages: [] },
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
        content: values.content,
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
        {isEdit && existingFiles.length > 0 && (
          <div className="mb-2 rounded-lg border border-black-200 bg-white">
            <table className="w-full text-xs leading-none">
              <thead className="sticky top-0 bg-black-100">
                <tr className="h-8 align-middle text-black-500">
                  <th className="w-8 pl-3 align-middle" />
                  <th className="pl-2 text-left align-middle font-medium">기존 첨부파일</th>
                  <th className="pr-8 text-center align-middle font-medium">용량</th>
                </tr>
              </thead>
              <tbody>
                {existingFiles.map((file) => (
                  <tr key={file.fileId} className="h-8 align-middle">
                    <td className="pl-3 align-middle">
                      <button
                        type="button"
                        onClick={() => handleDeleteExistingFile(file.fileId)}
                        aria-label={`${file.originalName} 삭제`}
                        className="flex items-center justify-center"
                      >
                        <UploadXIcon width={16} height={16} className="block" />
                      </button>
                    </td>
                    <td className="pl-2 align-middle text-sm text-black-800">
                      {file.originalName}
                    </td>
                    <td className="pr-8 text-center align-middle text-xs text-black-600">
                      {(file.size / 1024).toFixed(0)}KB
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
