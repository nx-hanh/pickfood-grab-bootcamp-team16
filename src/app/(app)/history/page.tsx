import { getLikedDishes } from "@/actions/dish.action";
import { auth } from "@/auth";
import LikedDishList from "@/components/history/LikedDishList";

const page = async () => {
  const session = await auth();
  const likedDish = await getLikedDishes(session?.user.email!);
  return (
    <div className="h-full w-full flex flex-col justify-start items-center max-w-screen-md mx-auto bg-gradient-to-br from-green-500 to-emerald-500 md:from-[#f4f5f9] md:to-[#f4f5f9]">
      <h2 className="text-2xl font-bold mt-2 mb-4">{"Tasty Dish Journal"}</h2>
      <LikedDishList serverLikedDish={likedDish.data} />
    </div>
  );
};

export default page;
