import Image from "next/image";
import React, { FC } from "react";

interface CardActionButtonsProps {
  setAction: React.Dispatch<React.SetStateAction<string>>;
}

const CardActionButtons: FC<CardActionButtonsProps> = ({ setAction }) => {
  return (
    <div className="absolute bottom-24 w-[250px] h-[100px] flex justify-between items-center">
      <button
        className="w-[100px] h-[100%] rounded-full flex items-center justify-center border-2 border-[#f08c00] "
        onClick={(event) => {
          event.preventDefault();
          setAction("dislike");
        }}
      >
        <Image
          src={"/card-action-dislike.svg"}
          alt="dislike"
          width={75}
          height={75}
        />
      </button>
      <button
        className="w-[100px] h-[100%] rounded-full flex items-center justify-center bg-[#c1f2b0] pt-1"
        onClick={(event) => {
          event.preventDefault();
          setAction("like");
        }}
      >
        <Image
          src={"/card-action-like.svg"}
          alt="like"
          width={75}
          height={75}
        />
      </button>
    </div>
  );
};

export default CardActionButtons;
