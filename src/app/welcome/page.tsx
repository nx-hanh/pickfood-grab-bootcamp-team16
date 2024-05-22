import React, { FC } from "react";
import MobileBody from "@/components/welcome/MobileBody";
import StoryContainer from "@/components/welcome/StoryContainer";
interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const story = {
    title: "Ăn ngon, ăn đúng, ăn vui!",
    description:
      "Băn khoăn ăn gì? Khám phá nhà hàng mới? Cùng PickFood, mỗi bữa ăn là niềm vui, kết nối và khởi đầu cho cuộc sống khỏe mạnh!",
  };
  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center">
      <MobileBody />
      <StoryContainer title={story.title} story={story.description} />
    </main>
  );
};

export default page;
