import * as fs from "fs";
const prefixFileName = `${process.cwd()}/src/lib/Backend/getFoodData/`;

function loadCategoriesOfMerchant() {
  global.categoryMerchant = new Map();
  let categories = fs
    .readFileSync(`${prefixFileName}category_idOfMerchant.txt`, "utf8")
    .split("\n");
  // let cnt = 0;
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i].split(" ");
    let merchant_id = category[0];
    let category_id = parseInt(category[1]);
    if (!global.categoryMerchant.has(merchant_id)) {
      global.categoryMerchant.set(merchant_id, new Map());
    }
    let cnt = global.categoryMerchant.get(merchant_id).get(category_id);
    if (cnt == undefined) {
      cnt = 0;
    }
    global.categoryMerchant.get(merchant_id).set(category_id, ++cnt);
  }
}

loadCategoriesOfMerchant();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "food-cms.grab.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
