import React, { FC } from "react";
import Image from "next/image";

interface DislikeButtonProps {
  handleAction: (action: string) => void;
}

const DislikeButton: FC<DislikeButtonProps> = ({ handleAction }) => {
  return (
      <button
        className="w-[30px] h-[30px] rounded-full flex items-center justify-center z-50"
        onClick={() => {
          handleAction("dislike");
        }}
      >
        <Image
          src={"/card-dislike-button-icon.svg"}
          alt="dislike"
          width={30}
          height={30}
        />
      </button>
  );
};

export default DislikeButton;
