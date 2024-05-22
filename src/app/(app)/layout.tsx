'use client'
import AppMenu from "@/components/home/AppMenu";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token || token === "undefined" || token === "" || token === "null") {
        alert("Please sign in to continue");
        router.push("/signin");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full flex flex-col w-full justify-start flex-1 overflow-hidden pb-14 sm:pb-20">
      {children}
      <div className="absolute bottom-0 left-0 w-full flex justify-center items-center">
        <AppMenu />
      </div>
    </div>
  );
}
