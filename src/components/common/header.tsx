import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 h-12 sm:h-16 w-full flex items-center justify-between lg:px-4 py-2 z-50">
      <Link href="/">
        <Image
          src="https://i.ibb.co/dGVK7LF/pickfood-logo.png"
          className="lg:pl-1 -ml-6  mt-1 cursor-pointer"
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
