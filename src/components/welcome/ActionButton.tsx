import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";

interface ActionButtonProps {
  isLogin: boolean;
  user?: User;
}

const ActionButton = async ({ isLogin, user }: ActionButtonProps) => {
  return (
    <>
      {isLogin ? (
        <form
          action={async () => {
            "use server";
            // await signIn("google");
          }}
          className="space-y-4"
        >
          <Button
            aria-label="Get Started"
            className="w-full min-h-fit px-6 py-3 text-base font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
          >
            Pick Food
          </Button>

          <p className="text-center text-sm text-gray-500">
            Welcome {user?.name}! Logged in with Google.
          </p>
        </form>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
          className="space-y-4"
        >
          <Button
            aria-label="Get Started"
            className="w-full min-h-fit px-6 py-3 text-base font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
          >
            Get started with Google
          </Button>

          <p className="text-center text-sm text-gray-500">
            Join thousands of food lovers finding their daily meals with ease!
          </p>
        </form>
      )}
    </>
  );
};

export default ActionButton;
