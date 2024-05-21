"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token || token === "") router.push("/welcome");
    else router.push("/home");
  }, []);
  return (
    <main></main>
  );
}
