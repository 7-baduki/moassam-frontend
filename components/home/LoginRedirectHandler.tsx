'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLoginModalStore } from '@/stores/loginModalStore';

export default function LoginRedirectHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const openLoginModal = useLoginModalStore((state) => state.open);

  useEffect(() => {
    if (searchParams.get('login') === 'required') {
      openLoginModal('로그인이 필요해요!', '로그인 후 이용할 수 있어요');
      router.replace('/');
    }
  }, [searchParams, openLoginModal, router]);

  return null;
}
