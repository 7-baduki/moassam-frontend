import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BoardBoundary } from '@/components/community/board';
import { MoabangBoundary } from '@/components/community/moabang';

const COMMUNITY_BOARDS = {
  board: { title: '자유게시판', Boundary: BoardBoundary },
  moabang: { title: '모아방', Boundary: MoabangBoundary },
} as const;

type CommunityBoardType = keyof typeof COMMUNITY_BOARDS;

function isCommunityBoardType(boardType: string): boardType is CommunityBoardType {
  return boardType in COMMUNITY_BOARDS;
}

export function generateStaticParams() {
  return Object.keys(COMMUNITY_BOARDS).map((boardType) => ({ boardType }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ boardType: string }>;
}): Promise<Metadata> {
  const { boardType } = await params;
  if (!isCommunityBoardType(boardType)) return {};

  return { title: `커뮤니티 - ${COMMUNITY_BOARDS[boardType].title}` };
}

export default async function CommunityBoardPage({
  params,
}: {
  params: Promise<{ boardType: string }>;
}) {
  const { boardType } = await params;
  if (!isCommunityBoardType(boardType)) notFound();

  const { Boundary } = COMMUNITY_BOARDS[boardType];
  return <Boundary />;
}
