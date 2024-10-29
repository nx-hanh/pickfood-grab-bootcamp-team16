import coverPhoto from "@/assets/images/userBground.jpg";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { MapPin, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UserPage = async () => {
  const session = await auth();
  const avatarUrl = session?.user.image || "/images/default-avatar.png";
  return (
    <div className="max-w-screen-md w-full h-full flex flex-col justify-start">
      <div className="">
        <Image
          src={coverPhoto.src}
          alt="Cover"
          className="w-full h-52"
          width={600}
          height={200}
        />
      </div>
      <div className="mt-2 mr-2">
        <Settings className="float-right" />
      </div>
      <div className="-mt-32 w-full flex flex-col items-center">
        <Image
          src={avatarUrl}
          alt="Profile"
          className="rounded-full bg-white shadow-md"
          width={200}
          height={200}
        />

        <p className="text-xl font-semibold my-2">{session?.user.name}</p>
        <p className="text-sm italic my-2">Một người yêu ẩm thực nhưng lười</p>

        <div className="flex">
          <MapPin />
          <p className="italic font-semibold">Hồ Chí Minh, Việt Nam</p>
        </div>
        <div className="flex w-full justify-around mt-3">
          <div className="flex gap-2">
            <p className="font-semibold">122</p>
            <p className="stats-label">Người theo dõi</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">67</p>
            <p className="stats-label">Đang theo dõi</p>
          </div>
        </div>

        <div className="flex py-4 gap-6">
          <form
            action={async () => {
              "use server";
              await signOut({
                redirectTo: "/",
              });
            }}
          >
            <Button
              aria-label="log out"
              className="w-full min-h-fit px-6 text-base font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              type="submit"
            >
              Log out
            </Button>
          </form>
          <Link href="/user/update-favorites">
            <Button
              aria-label="Update Favorites"
              className="w-full min-h-fit px-6 text-base font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              type="button"
            >
              Update Favorites
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
