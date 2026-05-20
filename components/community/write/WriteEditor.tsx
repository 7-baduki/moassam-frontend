'use client';

import { useRef, useState, useCallback, useEffect, type SVGProps } from 'react';
import { TwitterPicker } from 'react-color';
import { toast } from '@/utils/toast';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import {
  EditorBoldIcon,
  EditorItalicIcon,
  EditorUnderlineIcon,
  EditorStrikethroughIcon,
  EditorTextColorIcon,
  EditorTextfillIcon,
  EditorTextLeftIcon,
  EditorTextCenterIcon,
  EditorTextRightIcon,
  EditorTextJustifyIcon,
  EditorListIcon,
  EditorTableIcon,
  EditorImageIcon,
  EditorTrashIcon,
} from '@/app/assets/icons/editor';
import type { BoardDetailFile } from '@/components/community/board/board-detail/board-detail.type';
import WriteFileCard from './WriteFileCard';
import { SelectBottomSheet } from '@/components/common/bottom-sheet/SelectBottomSheet';
import { Select } from '@/components/common/select/Select';
import { ChevronDownIcon } from '@/app/assets/icons';
import StarterKit from '@tiptap/starter-kit';
import { TextStyleKit } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { TableKit } from '@tiptap/extension-table';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import imageCompression from 'browser-image-compression';
import { useIsMobile } from '@/hooks/useIsMobile';

async function uploadImage(file: File): Promise<string> {
  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    });
    return await imageCompression.getDataUrlFromFile(compressed);
  } catch {
    toast.error({ title: '이미지 삽입 실패', description: '잠시 후 다시 시도해주세요' });
    return '';
  }
}

const FONT_FAMILIES = [
  { label: '기본서체', value: 'Pretendard' },
  { label: '나눔고딕', value: 'NanumGothic' },
  { label: '나눔명조', value: 'NanumMyeongjo' },
  { label: 'Noto Sans', value: 'var(--font-noto-sans-kr)' },
  { label: 'Noto Serif', value: 'var(--font-noto-serif-kr)' },
  { label: '도현', value: 'var(--font-do-hyeon)' },
  { label: '블랙한산스', value: 'var(--font-black-han-sans)' },
  { label: '감자꽃', value: 'var(--font-gamja-flower)' },
  { label: '궁서체', value: 'ChosunGs' },
];

const FONT_SIZES = ['10', '12', '14', '16', '18', '20', '24', '28', '32', '36'];

const PICKER_COLORS = [
  '#343434',
  '#FF6900',
  '#FCB900',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#0693E3',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
];

interface WriteEditorProps {
  value: string;
  onChange: (value: string) => void;
  onAddFiles?: (files: FileList) => void;
  files?: File[];
  existingFiles?: BoardDetailFile[];
  onRemoveFile?: (index: number) => void;
  onDeleteExistingFile?: (fileId: number) => void;
}

export default function WriteEditor({
  value,
  onChange,
  onAddFiles,
  files = [],
  existingFiles = [],
  onRemoveFile,
  onDeleteExistingFile,
}: WriteEditorProps) {
  const initialValueRef = useRef(value);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);
  const colorBtnRef = useRef<HTMLDivElement>(null);
  const highlightBtnRef = useRef<HTMLDivElement>(null);
  const clipBtnRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showClipMenu, setShowClipMenu] = useState(false);
  const [showFontFamilySheet, setShowFontFamilySheet] = useState(false);
  const [showFontSizeSheet, setShowFontSizeSheet] = useState(false);
  const [pickerPos, setPickerPos] = useState({ top: 0, left: 0 });
  const [activeColor, setActiveColor] = useState('#343434');
  const [activeHighlightColor, setActiveHighlightColor] = useState('#FCB900');
  const isMobile = useIsMobile();

  const openPicker = useCallback(
    (
      ref: React.RefObject<HTMLDivElement | null>,
      setter: React.Dispatch<React.SetStateAction<boolean>>,
      initialColor?: string,
      colorSetter?: React.Dispatch<React.SetStateAction<string>>,
    ) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) setPickerPos({ top: rect.bottom + 4, left: rect.left });
      setter((v) => {
        if (!v && initialColor !== undefined) colorSetter?.(initialColor);
        return !v;
      });
    },
    [],
  );

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    e.target.value = '';

    if (!file.type.startsWith('image/')) {
      toast.warning({ title: '업로드 제한', description: '이미지 파일만 삽입할 수 있습니다' });
      return;
    }

    const url = await uploadImage(file);
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }

  const handleWrapperDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!editor) return;
    if ((e.target as HTMLElement).closest('.ProseMirror')) return;

    const file = e.dataTransfer.files[0];
    if (!file?.type.startsWith('image/')) {
      toast.warning({ title: '업로드 제한', description: '이미지 파일만 삽입할 수 있습니다' });
      return;
    }

    uploadImage(file).then((url) => {
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    });
  };

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editor) return;
    const target = e.target as HTMLElement;
    if (target.closest('button, select, input, .ProseMirror')) return;
    editor.chain().focus().run();
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyleKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TableKit.configure({ table: { resizable: true } }),
      Highlight.configure({ multicolor: true }),
      Image.configure({
        inline: true,
        allowBase64: true,
        resize: { enabled: true, alwaysPreserveAspectRatio: true },
      }),
      Placeholder.configure({ placeholder: '내용을 입력하세요.' }),
    ],
    immediatelyRender: false,
    content: value,
    editorProps: {
      handleDrop(view, event, _slice, moved) {
        if (moved) return false;
        const file = event.dataTransfer?.files[0];
        if (!file) return false;

        event.preventDefault();
        if (!file.type.startsWith('image/')) {
          toast.warning({ title: '업로드 제한', description: '이미지 파일만 삽입할 수 있습니다' });
          return true;
        }

        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });
        if (!pos) return true;

        uploadImage(file).then((url) => {
          if (!url) return;
          const node = view.state.schema.nodes.image?.create({ src: url });
          if (!node) return;
          view.dispatch(view.state.tr.insert(pos.pos, node));
        });
        return true;
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor || !initialValueRef.current) return;
    if (editor.isEmpty) {
      editor.commands.setContent(initialValueRef.current, { emitUpdate: false });
    }
  }, [editor]);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive('bold'),
      isItalic: ctx.editor?.isActive('italic'),
      isUnderline: ctx.editor?.isActive('underline'),
      isStrike: ctx.editor?.isActive('strike'),
      isAlignLeft: ctx.editor?.isActive({ textAlign: 'left' }),
      isAlignCenter: ctx.editor?.isActive({ textAlign: 'center' }),
      isAlignRight: ctx.editor?.isActive({ textAlign: 'right' }),
      isAlignJustify: ctx.editor?.isActive({ textAlign: 'justify' }),
      isBulletList: ctx.editor?.isActive('bulletList'),
      fontFamily: ctx.editor?.getAttributes('textStyle').fontFamily ?? 'Pretendard',
      fontSize: ctx.editor?.getAttributes('textStyle').fontSize?.replace('px', '') ?? '14',
      color: ctx.editor?.getAttributes('textStyle').color ?? '#343434',
      highlightColor: ctx.editor?.getAttributes('highlight').color ?? '#343434',
    }),
  });

  if (!editor) return null;

  const currentFontFamily = editorState?.fontFamily ?? 'Pretendard';
  const currentFontSize = editorState?.fontSize ?? '14';
  const currentColor = editorState?.color ?? '#343434';
  const currentHighlightColor = editorState?.highlightColor ?? '#FCB900';

  return (
    <div
      className="min-w-0 rounded-lg border border-black-200 bg-white"
      onDrop={handleWrapperDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleWrapperClick}
    >
      <div className="flex w-full min-w-0 items-center gap-2 border-b border-black-200 bg-black-200 px-2 max-md:h-10.75 max-md:flex-nowrap max-md:overflow-x-auto max-md:overflow-y-hidden max-md:[scrollbar-width:none] md:flex-wrap md:py-1.5 max-md:[&::-webkit-scrollbar]:hidden">
        {isMobile && onAddFiles && (
          <>
            <div ref={clipBtnRef}>
              <ToolbarButton onClick={() => openPicker(clipBtnRef, setShowClipMenu)} title="첨부">
                <PaperclipIcon />
              </ToolbarButton>
            </div>
            <Divider />
          </>
        )}
        {isMobile ? (
          <button
            type="button"
            onClick={() => setShowFontFamilySheet(true)}
            className="flex h-7 shrink-0 items-center gap-1 rounded px-1 text-xs whitespace-nowrap text-black-800 hover:bg-black-300"
          >
            <span>
              {FONT_FAMILIES.find((f) => f.value === currentFontFamily)?.label ?? '기본서체'}
            </span>
            <ChevronDownIcon width={12} height={12} className="shrink-0" />
          </button>
        ) : (
          <Select
            value={currentFontFamily}
            options={FONT_FAMILIES.map((f) => ({ label: f.label, value: f.value }))}
            onChange={(v) => editor.chain().focus().setFontFamily(v).run()}
            className="w-24 shrink-0 [&_li>button]:justify-between [&_li>button]:px-1.5 [&_li>button]:py-1.5 [&_li>button]:text-xs [&>button]:h-7 [&>button]:justify-between [&>button]:px-1.5 [&>button]:py-0 [&>button]:text-xs [&>button]:hover:bg-black-300"
          />
        )}

        <Divider />

        {isMobile ? (
          <button
            type="button"
            onClick={() => setShowFontSizeSheet(true)}
            className="flex h-7 w-14 shrink-0 items-center gap-1 rounded px-1 text-xs text-black-800 hover:bg-black-300"
          >
            <span>{currentFontSize}</span>
            <ChevronDownIcon width={12} height={12} className="shrink-0" />
          </button>
        ) : (
          <Select
            value={currentFontSize}
            options={FONT_SIZES.map((s) => ({ label: s, value: s }))}
            onChange={(v) =>
              editor
                .chain()
                .focus()
                .setFontSize(v + 'px')
                .run()
            }
            className="w-14 shrink-0 [&_li>button]:justify-between [&_li>button]:px-1.5 [&_li>button]:py-1.5 [&_li>button]:text-xs [&>button]:h-7 [&>button]:justify-between [&>button]:px-1.5 [&>button]:py-0 [&>button]:text-xs [&>button]:hover:bg-black-300"
          />
        )}

        <Divider />

        <ToolbarButton
          active={editorState?.isBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="굵게"
        >
          <EditorBoldIcon />
        </ToolbarButton>

        <ToolbarButton
          active={editorState?.isItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="기울임"
        >
          <EditorItalicIcon />
        </ToolbarButton>

        <ToolbarButton
          active={editorState?.isUnderline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="밑줄"
        >
          <EditorUnderlineIcon />
        </ToolbarButton>

        <ToolbarButton
          active={editorState?.isStrike}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="취소선"
        >
          <EditorStrikethroughIcon />
        </ToolbarButton>

        <div ref={colorBtnRef}>
          <ToolbarButton
            onClick={() =>
              openPicker(colorBtnRef, setShowColorPicker, currentColor, setActiveColor)
            }
            title="글자색"
          >
            <EditorTextColorIcon style={{ color: currentColor }} />
          </ToolbarButton>
        </div>

        <div ref={highlightBtnRef}>
          <ToolbarButton
            onClick={() =>
              openPicker(
                highlightBtnRef,
                setShowHighlightPicker,
                currentHighlightColor,
                setActiveHighlightColor,
              )
            }
            title="형광펜"
          >
            <EditorTextfillIcon style={{ color: currentHighlightColor }} />
          </ToolbarButton>
        </div>

        <Divider />

        <ToolbarButton
          active={editorState?.isAlignLeft}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          title="왼쪽 정렬"
        >
          <EditorTextLeftIcon />
        </ToolbarButton>

        <ToolbarButton
          active={editorState?.isAlignCenter}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title="가운데 정렬"
        >
          <EditorTextCenterIcon />
        </ToolbarButton>

        <ToolbarButton
          active={editorState?.isAlignRight}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title="오른쪽 정렬"
        >
          <EditorTextRightIcon />
        </ToolbarButton>

        <ToolbarButton
          active={editorState?.isAlignJustify}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          title="양쪽 정렬"
        >
          <EditorTextJustifyIcon />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          active={editorState?.isBulletList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="글머리 기호"
        >
          <EditorListIcon />
        </ToolbarButton>

        <Divider />

        {!isMobile && (
          <ToolbarButton onClick={() => imageInputRef.current?.click()} title="이미지 삽입">
            <span className="relative">
              <EditorImageIcon />
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </span>
          </ToolbarButton>
        )}
        {isMobile && (
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        )}

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
          title="표 삽입"
        >
          <EditorTableIcon />
        </ToolbarButton>
      </div>

      <BubbleMenu
        editor={editor}
        shouldShow={({ editor }) => editor.isActive('image')}
        options={{ placement: 'top' }}
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().deleteSelection().run()}
          title="이미지 삭제"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-black-200 bg-white text-black-700 shadow-md transition-colors hover:bg-black-100"
        >
          <EditorTrashIcon />
        </button>
      </BubbleMenu>

      <BubbleMenu editor={editor} shouldShow={({ editor }) => editor.isActive('table')}>
        <div className="flex items-center gap-0.5 rounded-lg border border-black-200 bg-white px-1.5 py-1 shadow-md">
          <TableBubbleButton onClick={() => editor.chain().focus().addRowAfter().run()}>
            행 추가
          </TableBubbleButton>
          <TableBubbleButton onClick={() => editor.chain().focus().deleteRow().run()}>
            행 삭제
          </TableBubbleButton>
          <div className="mx-1 h-4 w-px bg-black-200" />
          <TableBubbleButton onClick={() => editor.chain().focus().addColumnAfter().run()}>
            열 추가
          </TableBubbleButton>
          <TableBubbleButton onClick={() => editor.chain().focus().deleteColumn().run()}>
            열 삭제
          </TableBubbleButton>
          <div className="mx-1 h-4 w-px bg-black-200" />
          <TableBubbleButton onClick={() => editor.chain().focus().deleteTable().run()} danger>
            표 삭제
          </TableBubbleButton>
        </div>
      </BubbleMenu>

      {isMobile && (files.length > 0 || existingFiles.length > 0) && (
        <div className="grid grid-cols-2 gap-2 p-3">
          {existingFiles.map((file) => (
            <WriteFileCard
              key={`existing-${file.fileId}`}
              fileName={file.originalName}
              size={file.size}
              onRemove={() => onDeleteExistingFile?.(file.fileId)}
            />
          ))}
          {files.map((file, index) => (
            <WriteFileCard
              key={`new-${index}`}
              fileName={file.name}
              size={file.size}
              onRemove={() => onRemoveFile?.(index)}
            />
          ))}
        </div>
      )}

      <EditorContent
        editor={editor}
        className="prose-editor min-h-107 px-4 py-3 text-sm text-black-800"
      />

      <SelectBottomSheet
        open={showFontFamilySheet}
        onOpenChange={setShowFontFamilySheet}
        title="글꼴"
        options={FONT_FAMILIES.map((f) => ({ label: f.label, value: f.value }))}
        value={currentFontFamily}
        onChange={(value) => {
          editor.chain().focus().setFontFamily(value).run();
          setShowFontFamilySheet(false);
        }}
        onConfirm={() => setShowFontFamilySheet(false)}
      />

      <SelectBottomSheet
        open={showFontSizeSheet}
        onOpenChange={setShowFontSizeSheet}
        title="크기"
        options={FONT_SIZES.map((s) => ({ label: s, value: s }))}
        value={currentFontSize}
        onChange={(value) => {
          editor
            .chain()
            .focus()
            .setFontSize(value + 'px')
            .run();
          setShowFontSizeSheet(false);
        }}
        onConfirm={() => setShowFontSizeSheet(false)}
      />

      <input
        ref={mobileFileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) onAddFiles?.(e.target.files);
          e.target.value = '';
        }}
      />

      {showClipMenu && (
        <>
          <div className="fixed inset-0 z-900" onClick={() => setShowClipMenu(false)} />
          <div className="fixed z-1100" style={{ top: pickerPos.top, left: pickerPos.left }}>
            <div className="overflow-hidden rounded-lg border border-black-200 bg-white shadow-md">
              <button
                type="button"
                onClick={() => {
                  setShowClipMenu(false);
                  mobileFileInputRef.current?.click();
                }}
                className="flex w-full items-center px-4 py-3 text-sm text-black-700 hover:bg-black-100"
              >
                파일 첨부
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowClipMenu(false);
                  imageInputRef.current?.click();
                }}
                className="flex w-full items-center px-4 py-3 text-sm text-black-700 hover:bg-black-100"
              >
                본문에 사진 첨부
              </button>
            </div>
          </div>
        </>
      )}

      {showColorPicker && (
        <>
          <div className="fixed inset-0 z-900" onClick={() => setShowColorPicker(false)} />
          <div className="fixed z-1100" style={{ top: pickerPos.top, left: pickerPos.left }}>
            <TwitterPicker
              colors={PICKER_COLORS}
              color={activeColor}
              onChangeComplete={(color) => {
                setActiveColor(color.hex);
                editor.chain().setColor(color.hex).run();
              }}
            />
          </div>
        </>
      )}

      {showHighlightPicker && (
        <>
          <div className="fixed inset-0 z-900" onClick={() => setShowHighlightPicker(false)} />
          <div className="fixed z-1100" style={{ top: pickerPos.top, left: pickerPos.left }}>
            <TwitterPicker
              colors={PICKER_COLORS}
              color={activeHighlightColor}
              onChangeComplete={(color) => {
                setActiveHighlightColor(color.hex);
                editor.chain().setHighlight({ color: color.hex }).run();
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

function TableBubbleButton({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded px-2 py-0.5 text-xs transition-colors hover:bg-black-100 ${danger ? 'text-red-500' : 'text-black-700'}`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="-mx-1.5 h-4 w-px shrink-0 bg-black-300" />;
}

function PaperclipIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.5 7.5L7.5 13.5C6.12 14.88 3.88 14.88 2.5 13.5C1.12 12.12 1.12 9.88 2.5 8.5L9 2C9.93 1.07 11.43 1.07 12.36 2C13.29 2.93 13.29 4.43 12.36 5.36L6.35 11.37C5.88 11.84 5.12 11.84 4.65 11.37C4.18 10.9 4.18 10.14 4.65 9.67L10 4.32"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ToolbarButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  title?: string;
}

function ToolbarButton({ children, onClick, active, title }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-7 min-w-7 shrink-0 items-center justify-center rounded px-1 text-sm transition-colors ${
        active ? 'bg-black-400 text-black-800' : 'text-black-700 hover:bg-black-300'
      }`}
    >
      {children}
    </button>
  );
}
