import DishesRecommended from "@/components/home/DishesRecommend";

const Home = async () => {
  return (
    <div className="max-h-[960px] relative size-full max-w-screen-md">
      <DishesRecommended />
    </div>
  );
};

export default Home;
