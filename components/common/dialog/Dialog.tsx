'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import { Button, ButtonProps } from '@/components/common/button/Button';
import { cn } from '@/utils/cn';
import SuccessIcon from '@/app/assets/icons/SuccessIcon.svg';
import ErrorIcon from '@/app/assets/icons/ErrorIcon.svg';
import LockIcon from '@/app/assets/icons/LockIcon.svg';

type IconType = 'loading' | 'success' | 'error' | 'lock';

interface DialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  iconType: IconType;
  title?: string;
  description?: string;
  subDescription?: string;
  buttons?: ButtonProps[];
}

function DialogIcon({ iconType }: { iconType: IconType }) {
  if (iconType === 'loading') {
    return (
      <div className="h-7.5 w-7.5 animate-spin rounded-full border-3 border-pink-50 border-t-pink-500" />
    );
  }

  const ICONS: Record<Exclude<IconType, 'loading'>, React.ReactNode> = {
    success: <SuccessIcon />,
    error: <ErrorIcon />,
    lock: <LockIcon />,
  };

  return ICONS[iconType];
}

export function Dialog({
  open,
  onOpenChange,
  iconType,
  title,
  description,
  subDescription,
  buttons,
}: DialogProps) {
  const isLoading = iconType === 'loading';

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="overlay fixed inset-0 z-900" />
        <RadixDialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 z-1000 min-h-50 w-95 -translate-x-1/2 -translate-y-1/2',
            'flex flex-col justify-center rounded-[20px] bg-white p-6',
            'focus:outline-none',
          )}
          onEscapeKeyDown={isLoading ? (e) => e.preventDefault() : undefined}
          onPointerDownOutside={isLoading ? (e) => e.preventDefault() : undefined}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <DialogIcon iconType={iconType} />

            {(title || description) && (
              <div className="flex flex-col gap-0.5">
                {title && (
                  <RadixDialog.Title className="text-base font-semibold text-black">
                    {title}
                  </RadixDialog.Title>
                )}
                {description && (
                  <RadixDialog.Description className="text-xs font-medium text-black-500">
                    {description}
                  </RadixDialog.Description>
                )}
              </div>
            )}

            {subDescription && (
              <p className="pt-5 text-xs font-medium text-black-500">{subDescription}</p>
            )}

            {buttons && buttons.length > 0 && (
              <div
                className={cn('flex w-full gap-2.5 pt-5', buttons.length === 1 && 'justify-center')}
              >
                {buttons.map((btnProps, index) => (
                  <Button key={index} size="full" className="py-1.5" {...btnProps} />
                ))}
              </div>
            )}
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
