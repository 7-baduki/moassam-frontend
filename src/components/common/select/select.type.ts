export type SelectSize = 'sm' | 'md';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectSharedProps {
  size?: SelectSize;
  options: SelectOption[];
  triggerLabel?: string;
  triggerDescription?: string;
  className?: string;
  fixedMenu?: boolean;
}

interface SingleSelectProps extends SelectSharedProps {
  multiple?: false;
  value?: string;
  onChange?: (value: string) => void;
}

interface MultiSelectProps extends SelectSharedProps {
  multiple: true;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export type SelectProps = SingleSelectProps | MultiSelectProps;
