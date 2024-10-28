import RecommendCard from "@/components/recommend/RecommendCard";

interface RecommendPageProps {}

const RecommendPage = async ({}: RecommendPageProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-500 p-4">
      <RecommendCard />
    </div>
  );
};

export default RecommendPage;
