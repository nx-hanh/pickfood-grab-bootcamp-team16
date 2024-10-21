import AppMenu from "@/components/home/AppMenu";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative h-full flex flex-col w-full justify-center items-center flex-1 overflow-hidden pb-14 sm:pb-20 lg:bg-[#f3f4f8] bg-[#16a34a4a]">
      {children}
      <AppMenu />
    </main>
  );
}
