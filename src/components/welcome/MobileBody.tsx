'use client';
import React from "react";
import bgMobile from "@/assets/images/bg-welcome-mobile.jpg";
import { useRouter } from "next/navigation";

const MobileBody = () => {
  const router = useRouter();
  const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push("/signin");
  }
  const handleRegisterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push("/signup");
  }
  return (
    <div
      className="relative w-full h-[600px] bg-cover bg-center flex items-end justify-center"
      style={{ backgroundImage: `url(${bgMobile.src})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent via-80% to-black mix-blend-multiply"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent via-transparent via-90% to-black mix-blend-multiply"></div>
      <div className="mb-16 flex flex-col gap-4">
        <button
          className="w-[200px] rounded-lg py-2 px-4 text-white font-bold bg-gradient-to-tr from-[#3e871c] to-[#65B83F] z-50"
          onClick={handleRegisterClick}
        >
          Tạo tài khoản
        </button>
        <button
          className="w-[200px] rounded-lg py-[6px] px-4 text-white font-bold border-2 z-50"
          onClick={handleLoginClick}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default MobileBody;
