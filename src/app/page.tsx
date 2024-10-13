import SlideShow from "@/components/welcome/SlideShow";

export default function Page() {
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
        <div className="space-y-4">
          <button
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            aria-label="Get Started"
          >
            Get Started
          </button>
          <p className="text-center text-sm text-gray-500">
            Join thousands of food lovers finding their daily meals with ease!
          </p>
        </div>
      </div>
    </main>
  );
}
