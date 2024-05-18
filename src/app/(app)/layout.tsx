'use client'
import AppMenu from "@/components/home/AppMenu";
import { useAppDispatch } from "@/lib/hooks/redux";
import { Dish, addDishes } from "@/lib/redux/features/dishes/dishesSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData(token: string) {
      const response = await fetch("/api/getdishes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token || ""
       },
        //TODO: send lat, long when change to server
      })
      const data = await response.json();
      const dishData: Dish[] = data.dishes.map((card: any) => {
        return {
          id: card.id,
          image: card.imgLink,
          name: card.name,
          address: card.address,
          price: card.price.toString(),
          description: card.description,
          categories: card.categories,
        };
      });
      dispatch(addDishes(dishData));
    }
    // if (typeof window !== "undefined") {
    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     alert("Please sign in to continue");
    //     router.push("/signin");
    //   }
    //   else fetchData(token);
    // }
    fetchData("eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..H4ZrKxqVxmU4W3jBBjzZ_A.K60SCzydwLW23W7KwoU7Tm6rIAfjs4mSFPiGTbuDNsiYekXcS0dfmOKhvcq6AKUZ.uK5yEtE5Ap-GJvdNvIqClw");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-svh flex flex-col w-screen justify-start items-center">
      {children}
      <div className="absolute bottom-0 w-full flex justify-center items-center">
        <AppMenu />
      </div>
    </div>
  );
}
