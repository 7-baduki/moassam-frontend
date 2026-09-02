export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  action: React.ReactNode;
  maxLength?: number;
}
