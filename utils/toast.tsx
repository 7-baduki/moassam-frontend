'use client';

import { toast as sonnerToast } from 'sonner';
import ToastSuccessIcon from '@/app/assets/icons/ToastSuccessIcon.svg';
import ToastErrorIcon from '@/app/assets/icons/ToastErrorIcon.svg';
import ToastWarningIcon from '@/app/assets/icons/ToastWarningIcon.svg';
import XIcon from '@/app/assets/icons/XIcon.svg';

type ToastType = 'success' | 'error' | 'warning';

interface ToastOptions {
  title: string;
  description?: string;
}

const TOAST_ICON = {
  success: ToastSuccessIcon,
  error: ToastErrorIcon,
  warning: ToastWarningIcon,
} as const;

const TOAST_CLASS_NAMES: Record<ToastType, string> = {
  success: 'toast-success',
  error: 'toast-error',
  warning: 'toast-warning',
};

function ToastContent({
  type,
  title,
  description,
  onDismiss,
}: ToastOptions & { type: ToastType; onDismiss: () => void }) {
  const ToastIcon = TOAST_ICON[type];

  return (
    <div
      className={`${TOAST_CLASS_NAMES[type]} flex w-90 items-center justify-between rounded-lg px-5 py-3.5`}
    >
      <div className="flex items-center gap-3">
        <ToastIcon />
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-base font-semibold text-white">{title}</p>
          {description && <p className="text-sm font-medium text-black-500">{description}</p>}
        </div>
      </div>
      <button onClick={onDismiss} className="shrink-0 text-black-500" aria-label="닫기">
        <XIcon />
      </button>
    </div>
  );
}

export const toast = {
  success({ title, description }: ToastOptions) {
    sonnerToast.custom((id) => (
      <ToastContent
        type="success"
        title={title}
        description={description}
        onDismiss={() => sonnerToast.dismiss(id)}
      />
    ));
  },
  error({ title, description }: ToastOptions) {
    sonnerToast.custom((id) => (
      <ToastContent
        type="error"
        title={title}
        description={description}
        onDismiss={() => sonnerToast.dismiss(id)}
      />
    ));
  },
  warning({ title, description }: ToastOptions) {
    sonnerToast.custom((id) => (
      <ToastContent
        type="warning"
        title={title}
        description={description}
        onDismiss={() => sonnerToast.dismiss(id)}
      />
    ));
  },
};
