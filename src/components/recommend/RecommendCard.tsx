import { getRecommendDish } from "@/actions/dish.action";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { DishExtend } from "@/types/type";
import Image from "next/image";
import Link from "next/link";

const RecommendCard = async () => {
  const session = await auth();
  const data = await getRecommendDish(session?.user.email!);
  const dish = data?.data as DishExtend;
  const priceInFormatted = dish
    ? new Intl.NumberFormat("vn-VN", {
        style: "currency",
        currency: "VND",
      }).format(dish?.price)
    : "chưa xác định";
  const distanceInFormatted = dish?.distance
    ? dish.distance < 1
      ? `${Math.round(dish.distance * 1000)} m`
      : `${dish.distance.toFixed(2)} km`
    : "chưa xác định";
  return dish ? (
    <section
      className={
        "relative w-full max-w-md h-[65%] md:h-[80%] max-h-[650px] cursor-pointer transform transition-all duration-500"
      }
      aria-label="Interactive food card"
    >
      <article className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden ">
        <div className="relative w-full h-[60%]">
          <Image
            src={dish?.imgLink || "/slide-bg.jpg"}
            alt="Delicious Food"
            className="w-full h-full object-cover -z-10"
            width={480}
            height={220}
          />
          <div className="absolute z-20 top-0 w-full h-full bg-gradient-to-t from-white from-[5%] via-transparent via-[50%] to-transparent" />
        </div>
      </article>
      <div className="absolute z-50 w-full top-0 h-full left-0 px-4 py-2 text-sm text-gray-700 flex flex-col justify-end">
        <div className="space-y-3">
          <div className="w-full flex items-start justify-between ">
            <p className="text-xl md:text-3xl font-black line-clamp-2">
              {dish.name}
            </p>
            <span className="text-lg shadow-md font-extrabold bg-green-200 rounded-full px-3 py-1">
              {priceInFormatted}
            </span>
          </div>
          <p className="line-clamp-2">{dish.description}</p>
          <p className="line-clamp-2">
            <span className="font-semibold">Address: </span>
            <span className="font-light italic">{dish.address}</span>
          </p>
        </div>
        <div className="flex flex-col items-center w-full">
          <Link
            href={`https://www.google.com/maps/search/${dish.address}/?hl=vi-VN&entry=ttu`}
            target="_blank"
            className="w-full"
          >
            <Button
              type="button"
              className="w-full min-h-fit px-6 py-3 text-base font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            >
              {dish.distance ? `${distanceInFormatted} To go` : "Open in map"}
            </Button>
          </Link>
          <Link href={"/home"} className="underline text-green-600">
            view more
          </Link>
        </div>
      </div>
      <div className="absolute -z-10 w-full h-full top-0 left-0 animate-bounce-slow">
        <div className="absolute w-20 h-20 bg-green-300 rounded-full -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-16 h-16 bg-emerald-400 rounded-full -bottom-8 -right-8 animate-bounce"></div>
        <div className="absolute w-12 h-12 bg-green-400 rounded-full top-1/2 -right-6 animate-ping"></div>
      </div>
    </section>
  ) : (
    <div className="relative w-full max-w-md h-[80%] max-h-[650px] bg-slate-500 animate-pulse" />
  );
};

export default RecommendCard;
