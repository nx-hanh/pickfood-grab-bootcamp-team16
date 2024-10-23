import { auth } from "@/auth";
import DishesRecommended from "@/components/home/DishesRecommend";

const Home = async () => {
  const session = await auth();
  return (
    <section className="size-full pb-14 sm:pb-20 flex justify-center">
      <div className="max-h-[960px] relative size-full max-w-screen-md">
        <DishesRecommended email={session?.user?.email!} />
      </div>
    </section>
  );
};

export default Home;
