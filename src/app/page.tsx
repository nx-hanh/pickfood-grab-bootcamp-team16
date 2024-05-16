"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token || token === "") router.push("/welcome");
    else router.push("/home");
    //eslint-disable-next-line
  }, []);
  return (
    <main></main>
  );
}
// export default function Home() {
//   return <h1 className='text-4xl'>Home</h1>;
// }
