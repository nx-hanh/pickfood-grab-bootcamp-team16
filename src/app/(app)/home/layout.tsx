import CardActionButtons from "@/components/home/CardActionButtons";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full w-screen justify-start items-center">
      {children}
      <div className="absolute bottom-24 w-full flex justify-center items-center">
        <CardActionButtons/>
      </div>
    </div>  
  );
}
