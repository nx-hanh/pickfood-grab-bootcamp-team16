import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@/auth";
import Link from "next/link";

interface ActionButtonProps {
  isLogin: boolean;
  user?: User;
}

const ActionButton = async ({ isLogin, user }: ActionButtonProps) => {
  return (
    <>
      {isLogin ? (
        <div className="">
          <Link href="/home">
            <Button
              aria-label="Get Started"
              className="w-full min-h-fit px-6 py-3 text-base font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              type="submit"
            >
              Pick Food
            </Button>
          </Link>
          <p className="mt-3 text-center text-sm text-gray-500">
            Welcome <strong>{user?.name}</strong> ! Logged in with Google.
          </p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="w-full flex justify-center m-0 p-0"
          >
            <Button variant="link" aria-label="Sign Out" type="submit">
              Sign Out
            </Button>
          </form>
        </div>
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
            type="submit"
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
