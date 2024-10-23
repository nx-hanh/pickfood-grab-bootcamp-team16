import { auth } from "@/auth";
import DishesRecommended from "@/components/home/DishesRecommend";

const Home = async () => {
  const session = await auth();
  return (
    <div className="max-h-[960px] relative size-full max-w-screen-md">
      <DishesRecommended email={session?.user?.email!} />
    </div>
  );
};

export default Home;
