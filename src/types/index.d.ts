declare type ACTION_STATUS_TYPE = "success" | "fail";
declare type ActionReturn<T> = {
  status: ACTION_STATUS_TYPE;
  data?: T;
  error?: Error;
  message?: string;
};
declare type LocationInLatLong = {
  lat: number;
  long: number;
};
declare type RatingVectorElement = {
  category: number;
  rate?: number;
};
declare type RatingVectorConstructor = RatingVectorElement[];
declare type RecommendationElement = {
  similarity: number;
  id: number;
};
declare type RecommendedMark = Record<string, number>;
