const fs = require('fs');
const prefixFileName = `${process.cwd()}/src/lib/Backend/getFoodData/`;


async function loadCategories() {
    let categories = fs.readFileSync(`${prefixFileName}categories.txt`, 'utf8').split('\n');
    let categoriesArray = [];
    for (let i = 0; i < categories.length; i++) {
        categories[i] = categories[i].replace('\r', '');
        categoriesArray.push([i, categories[i]]);
    }
    return categoriesArray;
}

module.exports = loadCategories;