import React from "react";

interface StoryContainerProps {
  title: string;
  story: string;
}

const StoryContainer: React.FC<StoryContainerProps> = ({ title, story }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-6">
      <div className="text-center text-2xl font-bold">{title}</div>
      <div className="text-center text-md">{story}</div>
    </div>
  );
};

export default StoryContainer;
