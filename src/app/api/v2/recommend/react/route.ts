import { reactDish } from "@/actions/dish.action";
import { auth } from "@/auth";

export async function POST(request) {
  const session = await auth();
  if (!session || !session?.user)
    return Response.json({ error: "Unauthorized" });
  const data = await request.json();
  const res = await reactDish({
    email: session?.user.email!,
    dishId: data.dishId,
    reaction: data.react,
  });
  return new Response(JSON.stringify(res));
}
