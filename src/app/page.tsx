import SlideShow from "@/components/welcome/SlideShow";
import { auth } from "@/auth";
import ActionButton from "@/components/welcome/ActionButton";

export default async function Page() {
  const session = await auth();
  return (
    <main className="min-h-svh w-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 bg-white bg-opacity-90 p-6 rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Welcome to PickFood
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">
            Discover your perfect meal for today!
          </p>
        </div>
        <SlideShow />
        <ActionButton isLogin={Boolean(session)} user={session?.user} />
      </div>
    </main>
  );
}
