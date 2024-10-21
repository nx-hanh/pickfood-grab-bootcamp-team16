import { User } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
  callbacks: {
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        // User is available during sign-in
        token.onboardingCompleted = (user as User).onboardingCompleted;
      }
      if (trigger === "update" && session) {
        token = {
          ...token,
          onboardingCompleted: session.user.onboardingCompleted,
        };
        return token;
      }
      return token;
    },
    session({ session, token, trigger }) {
      session.user.onboardingCompleted = token.onboardingCompleted;
      return session;
    },
  },
  providers: [Google],
} satisfies NextAuthConfig;
