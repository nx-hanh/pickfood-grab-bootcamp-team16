"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

interface AppMenuProps {}

const AppMenu: FC<AppMenuProps> = ({}) => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(2);
  const items = [
    {
      src: "/app-menu-all-icon.svg",
      alt: "all",
      link: "/all",
      isDevelop: false,
    },
    {
      src: "/app-menu-temphobby-icon.svg",
      alt: "temp",
      link: "/temp-hobby",
      isDevelop: false,
    },
    {
      src: "/app-menu-home-icon.svg",
      alt: "home",
      link: "/home",
      size: 56,
      isDevelop: true,
    },
    {
      src: "/app-menu-history-icon.svg",
      alt: "history",
      link: "/history",
      isDevelop: true,
    },
    {
      src: "/app-menu-user-icon.svg",
      alt: "user",
      link: "/user",
      isDevelop: true,
    },
  ];
  useEffect(
    () => {
      const homePath = "/" + pathname.split("/")[1];
      const index = items.findIndex((item) => item.link === homePath);
      setActiveIndex(index != -1 ? index : 2);
    },
    // eslint-disable-next-line
    [pathname]
  );

  return (
    <section className="fixed bottom-0 inset-x-0 mx-auto h-14 sm:h-20 bg-primary max-w-screen-md flex flex-row justify-between items-center px-8 rounded-md">
      {items.map((item, index) => {
        return (
          <Link
            key={index}
            className="cursor-pointer w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center rounded-full text-black"
            href={item.isDevelop ? item.link : "/home"}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.size || 35}
              height={item.size || 35}
              className={
                index === activeIndex ? "opacity-100" : "opacity-70 fill-black"
              }
            />
          </Link>
        );
      })}
    </section>
  );
};

export default AppMenu;
