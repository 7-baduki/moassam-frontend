'use client';

import { useRef, useState, useCallback } from 'react';
import { TwitterPicker } from 'react-color';
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
import StarterKit from '@tiptap/starter-kit';
import { TextStyleKit } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { TableKit } from '@tiptap/extension-table';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

async function uploadImage(file: File): Promise<string> {
  // TODO: API 연결 시 아래 base64 로직을 FormData 업로드로 교체
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(file);
  });
}

const FONT_FAMILIES = [
  { label: '기본서체', value: 'Pretendard' },
  { label: '나눔고딕', value: 'NanumGothic' },
  { label: '나눔명조', value: 'NanumMyeongjo' },
  { label: '맑은고딕', value: 'Malgun Gothic' },
  { label: '굴림', value: 'Gulim' },
  { label: '돋움', value: 'Dotum' },
  { label: '바탕', value: 'Batang' },
  { label: '궁서', value: 'Gungsuh' },
  { label: 'Arial', value: 'Arial' },
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
}

export default function WriteEditor({ value, onChange }: WriteEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const colorBtnRef = useRef<HTMLDivElement>(null);
  const highlightBtnRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [pickerPos, setPickerPos] = useState({ top: 0, left: 0 });

  const openPicker = useCallback(
    (
      ref: React.RefObject<HTMLDivElement | null>,
      setter: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) setPickerPos({ top: rect.bottom + 4, left: rect.left });
      setter((v) => !v);
    },
    [],
  );

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    e.target.value = '';

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
    if (!file?.type.startsWith('image/')) return;

    uploadImage(file).then((url) => {
      if (url) editor.chain().focus().setImage({ src: url }).run();
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
        resize: { enabled: true, alwaysPreserveAspectRatio: true },
      }),
      Placeholder.configure({ placeholder: '내용을 입력하세요.', showOnlyCurrent: false }),
    ],
    immediatelyRender: false,
    content: value,
    editorProps: {
      handleDrop(view, event, _slice, moved) {
        if (moved) return false;
        const file = event.dataTransfer?.files[0];
        if (!file?.type.startsWith('image/')) return false;

        event.preventDefault();
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
      className="rounded-lg border border-black-200 bg-white"
      onDrop={handleWrapperDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleWrapperClick}
    >
      <div className="flex h-10.75 items-center gap-0.5 overflow-x-auto border-b border-black-200 bg-black-200 px-2">
        <select
          value={currentFontFamily}
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="h-7 cursor-pointer rounded px-1 text-xs text-black-800 outline-none hover:bg-black-300"
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        <select
          value={currentFontSize}
          onChange={(e) =>
            editor
              .chain()
              .focus()
              .setFontSize(e.target.value + 'px')
              .run()
          }
          className="h-7 w-14 cursor-pointer rounded px-1 text-xs text-black-800 outline-none hover:bg-black-300"
        >
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

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
          <ToolbarButton onClick={() => openPicker(colorBtnRef, setShowColorPicker)} title="글자색">
            <EditorTextColorIcon style={{ color: currentColor }} />
          </ToolbarButton>
        </div>

        <div ref={highlightBtnRef}>
          <ToolbarButton
            onClick={() => openPicker(highlightBtnRef, setShowHighlightPicker)}
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

      <EditorContent
        editor={editor}
        className="prose-editor prose-editor-scroll h-80 overflow-y-auto px-4 py-3 text-sm text-black-800"
      />

      {showColorPicker && (
        <>
          <div className="fixed inset-0 z-99" onClick={() => setShowColorPicker(false)} />
          <div className="fixed z-100" style={{ top: pickerPos.top, left: pickerPos.left }}>
            <TwitterPicker
              colors={PICKER_COLORS}
              color={currentColor}
              onChangeComplete={(color) => {
                editor
                  .chain()
                  .focus(undefined, { scrollIntoView: false })
                  .setColor(color.hex)
                  .run();
                setShowColorPicker(false);
              }}
            />
          </div>
        </>
      )}

      {showHighlightPicker && (
        <>
          <div className="fixed inset-0 z-99" onClick={() => setShowHighlightPicker(false)} />
          <div className="fixed z-100" style={{ top: pickerPos.top, left: pickerPos.left }}>
            <TwitterPicker
              colors={PICKER_COLORS}
              onChangeComplete={(color) => {
                editor
                  .chain()
                  .focus(undefined, { scrollIntoView: false })
                  .setHighlight({ color: color.hex })
                  .run();
                setShowHighlightPicker(false);
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
  return <div className="mx-1 h-5 w-px bg-black-300" />;
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
      className={`flex h-7 min-w-7 items-center justify-center rounded px-1 text-sm transition-colors ${
        active ? 'bg-black-400 text-black-800' : 'text-black-700 hover:bg-black-300'
      }`}
    >
      {children}
    </button>
  );
}
