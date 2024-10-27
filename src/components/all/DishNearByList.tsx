"use client";
import DishCard from "@/components/all/DishCard";
import { Masonry } from "react-plock";
import { DishWithRestaurant } from "@/types/type";

interface DishNearByListProps {
  data: DishWithRestaurant[];
}

const DishNearByList = ({ data }: DishNearByListProps) => {
  return (
    <section className="w-[90%] h-fit max-w-screen-lg flex flex-col justify-center items-start">
      {data.length > 0 && (
        <Masonry
          className="w-full"
          items={data}
          config={{
            columns: [2, 3],
            gap: [12, 24],
            media: [640, 1024],
          }}
          render={(item, idx) => <DishCard key={idx} dish={item} />}
        />
      )}
      {data.length === 0 && (
        <div className="text-center text-sm text-gray-600">
          No dishes found nearby.
        </div>
      )}
    </section>
  );
};

export default DishNearByList;
