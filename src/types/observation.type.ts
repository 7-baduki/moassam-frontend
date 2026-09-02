export interface ObservationCreateRequest {
  age: string;
  sectionTypes: string[];
  situation: string;
}

export interface ObservationCreateResponse {
  observationId: number;
}

export interface ObservationSection {
  sectionType: string;
  content: string;
}

export interface ObservationDetailResponse {
  observationId: number;
  title: string;
  summary: string;
  sections: ObservationSection[];
}

export interface ObservationListItem {
  observationId: number;
  title: string;
}

export interface ObservationListResponse {
  items: ObservationListItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface MyObservationListItem {
  observationId: number;
  title: string;
  age: string;
  curriculumType: string;
  createdAt: string;
}

export interface MyObservationListResponse {
  data: MyObservationListItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}
