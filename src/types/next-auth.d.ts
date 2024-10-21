import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      onboardingCompleted: boolean;
    } & DefaultSession["user"];
  }
}
declare module "@auth/core/jwt" {
  interface JWT extends DefaultJWT {
    onboardingCompleted: boolean;
  }
}
