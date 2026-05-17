import type { SelectOption } from '@/components/common/select/select.type';

export interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  hasClose?: boolean;
  children: React.ReactNode;
}

interface SelectBottomSheetSharedProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  options: SelectOption[];
  onConfirm: () => void;
}

interface SingleSelectBottomSheetProps extends SelectBottomSheetSharedProps {
  multiple?: false;
  value?: string;
  onChange?: (value: string) => void;
}

interface MultiSelectBottomSheetProps extends SelectBottomSheetSharedProps {
  multiple: true;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export type SelectBottomSheetProps = SingleSelectBottomSheetProps | MultiSelectBottomSheetProps;
