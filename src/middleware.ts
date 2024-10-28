import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { ONBOARDING, ROOT } from "@/lib/routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isOnboarding = nextUrl.pathname === ONBOARDING;
  const isRoot = nextUrl.pathname === ROOT;
  const isPassOnboard = req.auth?.user?.onboardingCompleted;
  if (isRoot) return;
  //redirect to root if not login yet or access onboarding but already done onboard
  if (!isAuthenticated || (isOnboarding && isPassOnboard))
    return Response.redirect(new URL(ROOT, nextUrl));
  //if had login redirect to onboard if not onboard yet
  if (!isOnboarding && !isPassOnboard)
    return Response.redirect(new URL(ONBOARDING, nextUrl));
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
