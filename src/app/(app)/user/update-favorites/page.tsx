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
    <section className="min-h-svh w-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md h-[80%] w-full space-y-4 md:space-y-8 bg-white p-2 md:p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-2 md:mt-6 text-center text-xl md:text-3xl font-extrabold text-gray-900">
            Change your favorite tags!
          </h2>
          <p className="mt-1 md:mt-2 text-center text-xs md:text-sm text-gray-600">
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
    </section>
  );
};

export default page;
