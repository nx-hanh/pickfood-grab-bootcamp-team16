import fs from "fs";
import _ from "lodash";

const maxCategories = Number(process.env.MAX_CATEGORY);
const prefixFileName = `${process.cwd()}/src/lib/Backend/recommendation/`;
const maxRating = 5;
const minRating = 0.1;

interface IRatingVector {
  categoriesRating: number[];
}

class RatingVector implements IRatingVector {
  categoriesRating: number[];

  constructor(categoriesId: RatingVectorConstructor = []) {
    this.categoriesRating = Array(maxCategories).fill(0);

    for (const category of categoriesId) {
      this.setRating(category.category, category.rate);
    }
  }

  merge(newRating: number[]) {
    for (const x of newRating) {
      this.categoriesRating[x] = 1;
    }
  }

  setRating(categoryId: number, rating = 1) {
    this.categoriesRating[categoryId] = rating;
  }

  updateRating(categoryId: number, rating: number) {
    this.categoriesRating[categoryId] = Math.max(
      minRating,
      this.categoriesRating[categoryId] + rating
    );
    this.categoriesRating[categoryId] = Math.min(
      maxRating,
      this.categoriesRating[categoryId]
    );
  }

  extractRating(): [number, number][] {
    const result: [number, number][] = [];
    for (let i = 0; i < this.categoriesRating.length; i++) {
      if (this.categoriesRating[i] > 0) {
        result.push([i, this.categoriesRating[i]]);
      }
    }
    return result;
  }

  getRating(categoryId: number): number {
    return this.categoriesRating[categoryId];
  }

  loop() {
    console.log(`Rating Vector: ${this.categoriesRating.length} categories`);
    this.categoriesRating.forEach((rating, index) => {
      console.log(`Category ${index}: ${rating}`);
    });
    console.log("End of Rating Vector");
  }

  calculateSimilarity(other: RatingVector): number {
    const dotProduct = _.sum(
      _.zipWith(this.categoriesRating, other.categoriesRating, (a, b) => a * b)
    );
    const normA = Math.sqrt(_.sum(this.categoriesRating.map((x) => x ** 2)));
    const normB = Math.sqrt(_.sum(other.categoriesRating.map((x) => x ** 2)));

    if (normA * normB === 0) return 0;
    return dotProduct / (normA * normB);
  }
}

class RecommendationSystem {
  dishRating: { rating: RatingVector; id: string }[];

  constructor() {
    this.dishRating = [];
    this.loadDish();
  }

  loadDish(fileName = `${prefixFileName}dish_categories.json`) {
    const dish2categories = JSON.parse(fs.readFileSync(fileName, "utf-8"));
    const combineDish = JSON.parse(
      fs.readFileSync(`${prefixFileName}combine_dish.txt`, "utf-8")
    );

    for (const item of combineDish) {
      const combineDishRating = new RatingVector();
      for (const dish of item.dishes) {
        combineDishRating.merge(dish2categories[dish].categories);
      }
      this.dishRating.push({ rating: combineDishRating, id: item.id });
    }
  }

  getListSimilarity(userRating: RatingVector) {
    const similarity = this.dishRating.map((dish) => ({
      similarity: userRating.calculateSimilarity(dish.rating),
      id: dish.id,
    }));
    return similarity.sort((a, b) => b.similarity - a.similarity);
  }
}

const recommendationSystem = new RecommendationSystem();

export { recommendationSystem, RatingVector };
