import React, { FC } from "react";
import Image from "next/image";

interface ListSimilarItemProps {
  image: string;
  title: string;
  address: string;
  price: string;
}

const ListSimilarItem: FC<ListSimilarItemProps> = ({
  image,
  title,
  address,
  price,
}) => {
  return (
    <div className="w-full flex flex-row justify-center items-center mb-3 border border-white">
      <div className="rounded-[20px] object-cover w-28 h-20 m-1 border-2 border-white">
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="object-cover h-full w-full rounded-[20px]"
        />
      </div>
      <div className="flex flex-col items-start justify-center w-full">
        <h2 className="text-lg font-semibold text-primary line-clamp-1">
          {title}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-1">{address}</p>
        <p className="text-sm text-gray-500 line-clamp-1">{price}</p>
      </div>
    </div>
  );
};

export default ListSimilarItem;
