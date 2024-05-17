const fs = require('fs');
const _ = require('lodash');

const maxCategories = Number(process.env.MAX_CATEGORY);
const prefixFileName = `${process.cwd()}/src/lib/Backend/recommendation/`;

class RatingVector {
    constructor(categoriesId) {
        this.categoriesRating = Array(maxCategories).fill(0);
        if (!categoriesId) {
            return;
        }
        for (const category of categoriesId) {
            if (category[0] == undefined) {
                this.setRating(category);
            }
            else {
                this.setRating(category[0], category[1]);
            }
        }
    }

    merge(newRating) {
        for (const x of newRating) {
            this.categoriesRating[x] = 1;
        }
    }

    setRating(categoryId, rating = 1) {
        this.categoriesRating[categoryId] = rating;
    }

    updateRating(categoryId, rating) {
        this.categoriesRating[categoryId] = Math.max(0, this.categoriesRating[categoryId] + rating);
    }

    extractRating() {
        let result = [];
        for (let i = 0; i < this.categoriesRating.length; i++) {
            if (this.categoriesRating[i] > 0) result.push([i, this.categoriesRating[i]]);
        }
        return result;
    }

    getRating(categoryId) {
        return this.categoriesRating[categoryId];
    }

    loop() {
        console.log(`Rating Vector: ${this.categoriesRating.length} categories`);
        for (let i = 0; i < this.categoriesRating.length; i++) {
            console.log(this.categoriesRating[i]);
        }
        console.log("End of Rating Vector");
    }

    calculateSimilarity(other) {
        // A 
        // B
        // A.B = A1.B1 + A2.B2 + ... + An.Bn
        // |A| = sqrt(A1^2 + A2^2 + ... + An^2)
        // |B| = sqrt(B1^2 + B2^2 + ... + Bn^2)
        // similarity = A.B / (|A|.|B|)
        const dotProduct = _.sum(_.zipWith(this.categoriesRating, other.categoriesRating, (a, b) => a * b));
        const normA = Math.sqrt(_.sum(_.map(this.categoriesRating, x => x ** 2)));
        const normB = Math.sqrt(_.sum(_.map(other.categoriesRating, x => x ** 2)));
        if (normA * normB === 0) return 0;
        return dotProduct / (normA * normB);
    }
}

class RecommendationSystem {
    constructor() {
        this.dishRating = [];
        this.loadDish();
    }

    loadDish(fileName = `${prefixFileName}dish_categories.json`) {
        this.dishRating = [];
        const dish2categories = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        const combineDish = JSON.parse(fs.readFileSync(`${prefixFileName}combine_dish.txt`, 'utf-8'));

        for (const item of combineDish) {
            const combineDishRating = new RatingVector();
            for (const dish of item.dishes) {
                combineDishRating.merge(dish2categories[dish].categories);
            }
            this.dishRating.push({ rating: combineDishRating, id: item.id });
        }
    }

    getListSimilarity(userRating) {
        const similarity = this.dishRating.map(dish => ({
            similarity: userRating.calculateSimilarity(dish.rating),
            id: dish.id
        }));
        return similarity.sort((a, b) => b.similarity - a.similarity);
    }
}

let recommendationSystem = new RecommendationSystem();

module.exports = { recommendationSystem, RatingVector };