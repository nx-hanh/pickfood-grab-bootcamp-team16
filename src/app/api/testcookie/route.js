const { cookies } = require("next/headers");

export async function GET(request) {
    // set cookie
    cookies().set("tempData", "some-temp-data", {
        maxAge: 20, // expires in 10 minutes
      });
    return new Response("Cookie set");
}