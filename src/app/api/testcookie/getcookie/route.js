const { cookies } = require("next/headers");

export async function GET(request) {
    // set cookie
    // let data = cookies().get("category_sent_list")?.value;
    let data = cookies().get("tempData")?.value;
    // loop data
    // for (let [key, value] of data) {
    //     console.log(`${key}: ${value}`);
    // }
    return new Response(`Cookie data: ${data}`);
}