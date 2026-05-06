export type BoardType = 'moabang' | 'free';

export interface WriteFormValues {
  title: string;
  content: string;
  files: File[];
  boardType: BoardType;
  age?: string;
  materialType?: string;
  topic?: string;
}
