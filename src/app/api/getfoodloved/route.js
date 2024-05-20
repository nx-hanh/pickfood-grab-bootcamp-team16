import { timeStamp } from 'console';

const jsonHeader = require('@/lib/Backend/header/jsonHeader.js');

export async function GET(request) {
    let decoded = JSON.parse(request.headers.get('decoded'));
    let result = [];
    result.push({
        id: "Idtest1",
        name: "Nametest1",
        imgLink: "https://food-cms.grab.com/compressed_webp/items/VNITE20240501174140025926/photo/be147352_074d1b67587.webp",
        price: 100000,
        description: "test description 1",
        category: "test category 1",
        address: "test address 1",
        timeStamp: Date.now(),
    });
    result.push({
        id: "Idtest2",
        name: "Nametest2",
        imgLink: "https://food-cms.grab.com/compressed_webp/items/VNITE20240501174140025926/photo/be147352_074d1b67587.webp",
        price: 200000,
        description: "test description 2",
        category: "test category 2",
        address: "test address 2",
        timeStamp: Date.now(),
    });
    return new Response(JSON.stringify(result), jsonHeader);
}