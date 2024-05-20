import CardActionButtons from "@/components/home/CardActionButtons";
import CategoryTags from "@/components/home/CategoryTags";
import Image from "next/image";
import React from "react";
import { FC } from "react";

interface CardProps {
  image: string;
  name: string;
  address: string;
  price: number;
  categories: string[];
  description: string;
}

const Card: FC<CardProps> = ({
  image,
  name,
  address,
  price,
  categories,
  description
}) => {
  const imgSrc = image ? image : "/logo.svg";
  const priceInFormatted = new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(price)
  return (
    <div className="relative h-full flex flex-col bg-[#18191A] w-full select-none cursor-pointer">
      <div className="h-80 w-full">
        <Image
          src={imgSrc}
          alt={name}
          height={300}
          width={300}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col p-4 h-full">
        <h1 className="text-white text-2xl font-bold w-full line-clamp-2 mb-1 touch-none">
          {name}
        </h1>
        <p className="text-white text-lg w-full line-clamp-2">{description}</p>
        <CategoryTags categories={categories} />
        <div className="grid grid-cols-10 gap-2 grid-rows-2">
          <Image
            alt="location"
            src="/app-address-icon.svg"
            height={0}
            width={0}
            className="col-span-1 object-cover w-full h-full max-h-[25px] max-w-[25px]"
          />
          <p className="col-start-2 col-span-9 text-white text-lg w-full line-clamp-2">
            {address}
          </p>
          <Image
            alt="price"
            src="/app-price-icon.svg"
            height={0}
            width={0}
            className="row-start-2 col-span-1 object-cover w-full h-full max-h-[25px] max-w-[25px] "
          />
          <p className="row-start-2 col-start-2 col-span-9 text-white text-lg w-full line-clamp-1">
            {priceInFormatted}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
