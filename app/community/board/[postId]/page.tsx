interface BoardDetailPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
  const { postId } = await params;

  return (
    <section className="rounded-2xl border border-black-200 bg-white px-8 py-10">
      <h1 className="text-2xl font-semibold text-black-800">자유게시판 상세</h1>
      <p className="mt-3 text-sm text-black-600">게시글 ID: {postId}</p>
    </section>
  );
}
