"use client";
import { cn } from "@/lib/utils";
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
      isDevelop: true,
    },
    {
      src: "/app-menu-temphobby-icon.svg",
      alt: "temp",
      link: "/recommend",
      isDevelop: true,
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
  useEffect(() => {
    const fetchLocation = async (location: LocationInLatLong) => {
      await fetch("api/v2/account/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location }),
      });
    };
    if (typeof window !== "undefined") {
      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((permissionStatus) => {
            if (permissionStatus.state === "prompt") {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  fetchLocation({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                  });
                },
                () => {
                  fetchLocation({ lat: -1, long: -1 });
                }
              );
            } else if (permissionStatus.state === "denied") {
              fetchLocation({ lat: -1, long: -1 });
            } else {
              navigator.geolocation.getCurrentPosition((position) => {
                fetchLocation({
                  lat: position.coords.latitude,
                  long: position.coords.longitude,
                });
              });
            }
          });
      }
    }
  }, []);
  return (
    <section
      className={cn(
        "fixed bottom-0 inset-x-0 mx-auto h-14 sm:h-20 bg-primary max-w-screen-md flex flex-row justify-between items-center px-8 rounded-md",
        "lg:inset-y-0 lg:right-0 lg:flex-col lg:my-auto lg:w-20 lg:h-[80%] lg:max-h-[30rem] lg:mx-0"
      )}
    >
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
              width={item.size || 30}
              height={item.size || 30}
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
