import { updateCurrentLocation } from "@/actions/user.action";
import { auth } from "@/auth";

export async function POST(request) {
  const session = await auth();
  if (!session || !session?.user)
    return Response.json({ error: "Unauthorized" });
  const data = await request.json();
  const res = await updateCurrentLocation({
    email: session?.user.email!,
    location: data.location,
  });
  return new Response(JSON.stringify(res));
}
