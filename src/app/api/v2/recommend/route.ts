import { getRecommendDishes } from "@/actions/dish.action";
import { auth } from "@/auth";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request) {
  const url = new URL(request.url);
  const search_params = new URLSearchParams(url.searchParams);
  let lat = search_params.get("lat")
    ? parseFloat(search_params.get("lat")!)
    : -1;
  let long = search_params.get("long")
    ? parseFloat(search_params.get("long")!)
    : -1;
  const location = lat !== -1 && long !== -1 ? { lat, long } : undefined;
  const session = await auth();
  if (!session || !session?.user)
    return Response.json({ error: "Unauthorized" });
  const data = await getRecommendDishes({
    location,
    userEmail: session?.user.email!,
  });

  return new Response(JSON.stringify(data));
}
