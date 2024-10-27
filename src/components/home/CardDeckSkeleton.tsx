import React, { FC } from "react";

interface CardDeckSkeletonProps {}

const CardDeckSkeleton: FC<CardDeckSkeletonProps> = ({}) => {
  return (
    <div className="h-full w-full max-w-screen-md p-4 animate-pulse flex flex-col justify-start items-start space-y-3">
      <div className="h-[320px] w-full bg-slate-700"></div>
      <div className="h-12 w-3/4 bg-slate-700 ml-3 rounded-full"></div>
      <div className="h-6 w-2/3 bg-slate-700 ml-3 rounded-full"></div>
      <div className="h-4 w-1/2 bg-slate-700 ml-3 rounded-full"></div>
    </div>
  );
};

export default CardDeckSkeleton;
