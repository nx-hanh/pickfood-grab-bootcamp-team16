
async function filterCategory(category) {
    category = category.filter((item) => item < Number(process.env.MAX_CATEGORY));
    let category_set = new Set(category);
    category = Array.from(category_set);
    return category;
}

module.exports = filterCategory;