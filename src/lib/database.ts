import prisma from "@/lib/prisma";

export const isPassOnboarding = async (userId: string | null | undefined) => {
  if (!userId) return false;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user?.onboardingCompleted;
  // Add more checks as needed
};
