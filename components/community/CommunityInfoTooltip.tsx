interface CommunityInfoTooltipProps {
  className?: string;
}

export default function CommunityInfoTooltip({ className }: CommunityInfoTooltipProps) {
  return (
    <div className={`absolute top-full left-1/2 z-200 mt-2 -translate-x-1/2 ${className ?? ''}`}>
      <div
        className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-tl-xs bg-black-800"
        style={{ top: '-2px' }}
      />
      <div className="rounded-lg bg-black-800 px-2.5 py-2 font-medium whitespace-nowrap">
        <p className="text-[11px] text-white">AI 생성횟수 추가 안내</p>
        <ul className="mt-1 space-y-0.5 text-[10px] text-black-100">
          <li>・자유게시판 글 작성 시 1회</li>
          <li>・모아방 자료 업로드 시 3회</li>
        </ul>
      </div>
    </div>
  );
}
