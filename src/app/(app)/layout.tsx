import { getRecommendDishes } from "@/actions/dish.action";
import { auth } from "@/auth";
import AppMenu from "@/components/home/AppMenu";
import TempComponentForFetch from "@/components/home/TempComponentForFetch";
import { dishes } from "@prisma/client";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();
  // const handleFetchDishes = async (location: LocationInLatLong) => {
  //   "use server";
  //   await getRecommendDishes({
  //     location,
  //     userEmail: session?.user.email!,
  //   });
  //   return [] as dishes[];
  // };
  return (
    <main className="relative h-full flex flex-col w-full justify-start flex-1 overflow-hidden pb-14 sm:pb-20">
      {children}
      <AppMenu />
      {/* <TempComponentForFetch fetchDishFunction={handleFetchDishes} /> */}
    </main>
  );
}
