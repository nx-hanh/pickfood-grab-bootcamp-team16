import {
  recommendationSystem,
  RatingVector,
} from "@/lib/Backend/recommendation/recommendationSystem";

interface RecommendationParams {
  userRatingVector: RatingVector;
}
export default async function getRecommendation({
  userRatingVector,
}: RecommendationParams) {
  // userRatingVector.loop();
  let rcm_result = recommendationSystem.getListSimilarity(userRatingVector);
  return rcm_result;
}
