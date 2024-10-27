import { getNearByDishes } from "@/actions/dish.action";
import { auth } from "@/auth";
import DishNearByList from "@/components/all/DishNearByList";

const AllDishPage = async () => {
  const session = await auth();
  const data = await getNearByDishes(session?.user.email!);
  return (
    <div className="h-svh w-full flex items-start justify-center bg-gradient-to-br from-green-500 to-emerald-500 p-4 overflow-y-scroll overflow-x-hidden">
      <DishNearByList data={data.data} />
    </div>
  );
};

export default AllDishPage;
