import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 h-12 sm:h-16 w-full flex items-center justify-between px-4 py-2">
      <Link href="/">
        <Image
          src="/logo.png"
          className="pl-1 cursor-pointer"
          alt="logo"
          width={150}
          height={100}
          priority
        />
      </Link>
      <div className="flex">
        {
          //navigation menu
          // <DarkModeToggle />
        }
      </div>
    </header>
  );
};

export default Header;
