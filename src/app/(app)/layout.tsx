import AppMenu from "@/components/home/AppMenu";
import { resetRecommendData } from "@/actions/user.action";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await resetRecommendData();
  return (
    <main className="relative h-full flex flex-col w-full justify-center items-center flex-1 overflow-hidden lg:bg-[#f3f4f8] bg-[#16a34a4a]">
      {children}
      <AppMenu />
    </main>
  );
}
