'use client';

import { useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
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
} from '@/app/assets/icons/editor';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextStyleKit } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { TableKit } from '@tiptap/extension-table';
import Highlight from '@tiptap/extension-highlight';
import ResizableImage from 'tiptap-extension-resize-image';

async function uploadImage(file: File): Promise<string> {
  // TODO: API 연결 시 아래 base64 로직을 FormData 업로드로 교체
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(file);
  });
}

const FONT_FAMILIES = [
  { label: 'Pretendard', value: 'Pretendard' },
  { label: '굴림', value: 'Gulim' },
  { label: '돋움', value: 'Dotum' },
  { label: '맑은 고딕', value: 'Malgun Gothic' },
  { label: '나눔고딕', value: 'NanumGothic' },
];

const FONT_SIZES = ['10', '12', '14', '16', '18', '20', '24', '28', '32', '36'];

interface WriteEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function WriteEditor({ value, onChange }: WriteEditorProps) {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const highlightInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    e.target.value = '';

    const url = await uploadImage(file);
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyleKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TableKit,
      Highlight.configure({ multicolor: true }),
      ResizableImage,
    ],
    immediatelyRender: false,
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const currentFontFamily = editor.getAttributes('textStyle').fontFamily ?? 'Pretendard';
  const currentFontSize = editor.getAttributes('textStyle').fontSize?.replace('px', '') ?? '14';
  const currentColor = editor.getAttributes('textStyle').color ?? '#343434';

  return (
    <div className="rounded-lg border border-black-200 bg-white">
      <div className="flex h-[43px] items-center gap-0.5 overflow-x-auto border-b border-black-200 bg-black-200 px-2">
        <select
          value={currentFontFamily}
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="h-7 rounded px-1 text-xs text-black-800 outline-none hover:bg-black-100"
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
          className="h-7 w-14 rounded px-1 text-xs text-black-800 outline-none hover:bg-black-100"
        >
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <Divider />

        <ToolbarButton
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="굵게"
        >
          <EditorBoldIcon />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="기울임"
        >
          <EditorItalicIcon />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="밑줄"
        >
          <EditorUnderlineIcon />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="취소선"
        >
          <EditorStrikethroughIcon />
        </ToolbarButton>

        <ToolbarButton onClick={() => colorInputRef.current?.click()} title="글자색">
          <span className="relative">
            <EditorTextColorIcon />
            <input
              ref={colorInputRef}
              type="color"
              value={currentColor}
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              className="absolute inset-0 h-0 w-0 opacity-0"
            />
          </span>
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive('highlight')}
          onClick={() =>
            editor.isActive('highlight')
              ? editor.chain().focus().unsetHighlight().run()
              : highlightInputRef.current?.click()
          }
          title="형광펜"
        >
          <span className="relative">
            <EditorTextfillIcon />
            <input
              ref={highlightInputRef}
              type="color"
              defaultValue="#fef08a"
              onChange={(e) => editor.chain().focus().setHighlight({ color: e.target.value }).run()}
              className="absolute inset-0 h-0 w-0 opacity-0"
            />
          </span>
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          active={editor.isActive({ textAlign: 'left' })}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          title="왼쪽 정렬"
        >
          <EditorTextLeftIcon />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive({ textAlign: 'center' })}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title="가운데 정렬"
        >
          <EditorTextCenterIcon />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive({ textAlign: 'right' })}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title="오른쪽 정렬"
        >
          <EditorTextRightIcon />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive({ textAlign: 'justify' })}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          title="양쪽 정렬"
        >
          <EditorTextJustifyIcon />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          active={editor.isActive('bulletList')}
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

      <EditorContent
        editor={editor}
        className="prose-editor min-h-64 px-4 py-3 text-sm text-black-800"
      />
    </div>
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
        active ? 'bg-black-200 text-black-800' : 'text-black-700 hover:bg-black-100'
      }`}
    >
      {children}
    </button>
  );
}
