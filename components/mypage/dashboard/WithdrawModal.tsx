'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FocusTrap } from 'focus-trap-react';
import { XIcon } from '@/app/assets/icons';
import { WithdrawMascot, WithdrawCompleteMascot } from '@/app/assets/images';
import { Button } from '@/components/common/button/Button';
import { toast } from '@/utils/toast';

type WithdrawStep = 'confirm' | 'complete';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const [step, setStep] = useState<WithdrawStep>('confirm');
  const router = useRouter();

  const handleClose = useCallback(() => {
    onClose();
    setStep('confirm');
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <FocusTrap focusTrapOptions={{ escapeDeactivates: false, returnFocusOnDeactivate: true }}>
      <div className="fixed inset-0 z-1000 flex items-center justify-center">
        <div className="overlay absolute inset-0" onClick={handleClose} aria-hidden="true" />
        <div
          className="relative z-10 flex h-120 w-95 flex-col rounded-[20px] bg-white px-7 pt-2.5 pb-8 leading-[140%]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="withdraw-modal-title"
        >
          <div className="flex items-center justify-between">
            <h2 id="withdraw-modal-title" className="py-4.5 text-lg font-semibold text-black">
              회원 탈퇴
            </h2>
            <button type="button" onClick={handleClose} aria-label="닫기">
              <XIcon />
            </button>
          </div>

          <div className="flex justify-center py-5">
            <Image
              src={step === 'complete' ? WithdrawCompleteMascot : WithdrawMascot}
              alt="탈퇴 마스코트"
              width={154}
              height={185}
            />
          </div>

          {step === 'confirm' && (
            <>
              <p className="text-center text-sm font-semibold text-black-600">
                회원 탈퇴 시 모아쌤에 기록된 관찰일지와
                <br />
                활동 내역이 모두 삭제되며, 복구할 수 없어요
              </p>
              <p className="pt-5 text-center text-sm font-semibold text-black-600">
                정말로 탈퇴하시겠어요?
              </p>
              <div className="mt-auto flex gap-6">
                <Button
                  variant="outline"
                  size="full"
                  onClick={() => {
                    handleClose();
                    toast.success({
                      title: '탈퇴가 취소되었어요',
                      description: '계속 이용하실 수 있어요',
                    });
                  }}
                >
                  더 써볼래요
                </Button>
                <Button variant="primary" size="full" onClick={() => setStep('complete')}>
                  떠날래요
                </Button>
              </div>
            </>
          )}

          {step === 'complete' && (
            <>
              <p className="text-center text-sm font-semibold text-black-600">
                다음에 꼭 다시 만나요!
                <br />더 나은 모습으로 기다릴게요
              </p>
              <div className="mt-auto">
                <Button variant="primary" size="full" onClick={() => router.push('/')}>
                  메인으로
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </FocusTrap>
  );
}
