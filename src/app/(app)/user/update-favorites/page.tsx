import { getUserAndAccount } from "@/actions/user.action";
import { auth, updateSession } from "@/auth";
import OnboardForm from "@/components/onboarding/OnboardForm";

const page = async () => {
  const session = await auth();
  const updateSessionHandle = async () => {
    "use server";
    await updateSession({
      ...session,
      user: { ...session?.user, onboardingCompleted: true },
    });
  };
  const UserData = await getUserAndAccount(session?.user.email!);
  return (
    <main className="min-h-svh w-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Change your favorite tags!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {" Let's personalize your experience"}
          </p>
        </div>
        <OnboardForm
          userEmail={session?.user?.email!}
          updateFunction={updateSessionHandle}
          isUpdate={true}
          favorites={UserData?.user.favorites}
        />
      </div>
    </main>
  );
};

export default page;
