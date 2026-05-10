export interface ObservationRequest {
  age: string;
  sectionTypes: string[];
  situation: string;
}

export interface ObservationResponse {
  observationId: number;
}
