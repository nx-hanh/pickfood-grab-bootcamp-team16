import AppMenu from "@/components/home/AppMenu";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="h-svh flex flex-col w-screen justify-start items-center">
      {children}
      <div className="absolute bottom-0 w-full flex justify-center items-center">
        <AppMenu/>
      </div>
    </div>  
  );
}
