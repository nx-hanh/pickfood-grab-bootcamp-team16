import { getLikedDishes } from "@/actions/dish.action";
import { auth } from "@/auth";
import LikedDishList from "@/components/history/LikedDishList";

const page = async () => {
  const session = await auth();
  const likedDish = await getLikedDishes(session?.user.email!);
  return (
    <div className="h-full w-full flex flex-col justify-start items-center max-w-screen-md mx-auto bg-[#F4F5F9]">
      <h2 className="text-2xl font-bold mt-2 mb-4">Nhật Ký Món Ngon</h2>
      <LikedDishList serverLikedDish={likedDish.data} />
    </div>
  );
};

export default page;
