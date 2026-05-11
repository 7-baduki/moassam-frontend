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
