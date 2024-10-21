export const CATEGORIES = [
  "Beef",
  "Coffee - Tea - Juice",
  "Bread",
  "Milk Tea",
  "Dessert",
  "Fast Food",
  "Snack",
  "Healthy Food",
  "Hotpot & Grill",
  "International Food",
  "Noodles",
  "Rice",
  "Others",
  "Vietnamese Cake",
  "Bánh Mì",
  "Congee",
  "Dimsum",
  "Pizza",
  "Seafood",
  "Món Nhậu",
  "Vegan - Vegetarian",
  "Japanese",
];
export const CATEGORIES_MAP = new Map(
  CATEGORIES.map((category, index) => [category, index] as [string, number])
);

export const ACTION_STATUS: {
  success: ACTION_STATUS_TYPE;
  fail: ACTION_STATUS_TYPE;
} = {
  success: "success",
  fail: "fail",
};
