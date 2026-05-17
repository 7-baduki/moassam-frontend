'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { WithdrawMascot, WithdrawCompleteMascot } from '@/app/assets/images';
import { Button } from '@/components/common/button/Button';
import { BottomSheet } from '@/components/common/bottom-sheet/BottomSheet';
import { toast } from '@/utils/toast';
import { useWithdrawMutation } from '@/hooks/queries/auth/useAuth';

type WithdrawStep = 'confirm' | 'complete';

interface WithdrawBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WithdrawBottomSheet({ isOpen, onClose }: WithdrawBottomSheetProps) {
  const [step, setStep] = useState<WithdrawStep>('confirm');
  const router = useRouter();

  const { mutate: handleWithdraw, isPending } = useWithdrawMutation({
    onSuccess: () => {
      setStep('complete');
    },
    onError: () => {
      toast.error({ title: '탈퇴 실패', description: '잠시 후 다시 시도해주세요' });
    },
  });

  const handleClose = useCallback(() => {
    onClose();
    setStep('confirm');
  }, [onClose]);

  return (
    <BottomSheet open={isOpen} onOpenChange={(open) => !open && handleClose()} title="회원 탈퇴">
      <div className="flex flex-col px-4 pb-5 leading-[140%]">
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
            <div className="mt-8 flex gap-6">
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
              <Button
                variant="primary"
                size="full"
                disabled={isPending}
                onClick={() => handleWithdraw()}
              >
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
            <div className="mt-8">
              <Button
                variant="primary"
                size="full"
                onClick={() => {
                  router.push('/');
                  router.refresh();
                  toast.success({
                    title: '회원 탈퇴가 완료되었어요',
                    description: '그동안 모아쌤을 이용해주셔서 감사합니다',
                  });
                }}
              >
                메인으로
              </Button>
            </div>
          </>
        )}
      </div>
    </BottomSheet>
  );
}
