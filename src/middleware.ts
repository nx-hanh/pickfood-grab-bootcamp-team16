import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { ONBOARDING, PUBLIC_ROUTES, ROOT } from "@/lib/routes";
import { isPassOnboarding } from "@/lib/database";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isOnboarding = nextUrl.pathname === ONBOARDING;
  const isRoot = nextUrl.pathname === ROOT;
  const isPassOnboard = await isPassOnboarding(req.auth?.user?.id);

  //redirect to root if not login yet or access onboarding but already done onboard
  if (!isAuthenticated || (isOnboarding && isPassOnboard))
    return Response.redirect(new URL(ROOT, nextUrl));
  //if had login redirect to onboard if not onboard yet
  if (!isPassOnboard && !ROOT)
    return Response.redirect(new URL(ONBOARDING, nextUrl));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
