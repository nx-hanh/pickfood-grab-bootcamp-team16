import CardActionButtons from "@/components/home/CardActionButtons";
import Image from "next/image";
import React from "react";
import { FC } from "react";

interface CardProps {
  image: string;
  name: string;
  address: string;
  price: string;
}

const Card: FC<CardProps> = ({ image, name, address, price }) => {
  return (
    <div className="relative flex flex-col bg-black border-2 border-[#fbf6ee] h-full w-full select-none cursor-pointer">
      <div className="h-56 w-full border-b border-[#fbf6ee]">
        <Image
          src={image}
          alt={name}
          height={0}
          width={0}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col p-4 h-full">
        <h1 className="text-white text-2xl font-bold w-full line-clamp-2 mb-1 touch-none">
          {name}
        </h1>
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
            ${price} vnđ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
