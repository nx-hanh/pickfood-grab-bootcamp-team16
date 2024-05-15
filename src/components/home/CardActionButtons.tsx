import Image from "next/image";
import React, { FC } from "react";
const ACTIONS_TYPE = {
  LIKE: 'like',
  DISLIKE: 'dislike',
  SKIP: 'skip',
  NONE: 'none'
}
interface CardActionButtonsProps {
  isSwiping: string;
  setAction: React.Dispatch<React.SetStateAction<string>>;
}

const CardActionButtons: FC<CardActionButtonsProps> = ({isSwiping, setAction }) => {
  const bgSkip = isSwiping === ACTIONS_TYPE.SKIP ? 'bg-[#f08c00] bg-opacity-50 border-opacity-0' : 'bg-transparent';
  const bgLike = isSwiping === ACTIONS_TYPE.LIKE ? 'bg-[#2F9E44] bg-opacity-50 border-opacity-0' : 'bg-transparent';
  return (
    <div className="absolute bottom-24 w-[200px] h-[75px] flex justify-between items-center">
      <button
        className={`w-[75px] h-[100%] rounded-full flex items-center justify-center border-2 border-[#f08c00] ${bgSkip}`}
        onClick={(event) => {
          event.preventDefault();
          setAction(ACTIONS_TYPE.SKIP);
        }}
      >
        <Image
          src={"/card-action-skip.svg"}
          alt="dislike"
          width={50}
          height={50}
        />
      </button>
      <button
        className={`w-[75px] h-[100%] rounded-full flex items-center justify-center border-2 border-[#2F9E44] ${bgLike}`}
        onClick={(event) => {
          event.preventDefault();
          setAction(ACTIONS_TYPE.LIKE);
        }}
      >
        <Image
          src={"/card-action-like.svg"}
          alt="like"
          width={50}
          height={50}
        />
      </button>
    </div>
  );
};

export default CardActionButtons;
