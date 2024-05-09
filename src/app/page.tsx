import MobileBody from "@/components/welcome/MobileBody";
import StoryContainer from "@/components/welcome/StoryContainer";

export default function Welcome() {
  const story = {
    title: "Ăn ngon, ăn đúng, ăn vui!",
    description: "Băn khoăn ăn gì? Khám phá nhà hàng mới? Cùng PickFood, mỗi bữa ăn là niềm vui, kết nối và khởi đầu cho cuộc sống khỏe mạnh!"
  };

  return (
    <main className="w-full flex flex-col items-center justify-center">
      <MobileBody />
      <StoryContainer title={story.title} story={story.description} />
    </main>
  );
}
// export default function Home() {
//   return <h1 className='text-4xl'>Home</h1>;
// }
