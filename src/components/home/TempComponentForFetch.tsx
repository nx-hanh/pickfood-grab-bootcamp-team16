"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectLocation,
  updateLocation,
} from "@/lib/redux/features/user/userSlice";
import { dishes } from "@prisma/client";
import React, { FC, useEffect } from "react";

interface TempComponentForFetchProps {
  fetchDishFunction: (location: LocationInLatLong) => Promise<dishes[]>;
}
//this component fetches data based on the user's location and get dishes based on the location
const TempComponentForFetch: FC<TempComponentForFetchProps> = ({
  fetchDishFunction,
}) => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectLocation);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                dispatch(
                  updateLocation({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                  })
                );
              },
              () => {
                // Handle error.
                console.error("Error getting location");
              }
            );
          } else if (permissionStatus.state === "denied") {
            // Permission denied by the user.
            console.log("Permission denied by the user");
          } else {
            navigator.geolocation.getCurrentPosition((position) => {
              dispatch(
                updateLocation({
                  lat: position.coords.latitude,
                  long: position.coords.longitude,
                })
              );
            });
          }
        });
    }
    fetchDishFunction(location);
    //should dispath dishes
    //eslint-disable-next-line
  }, []);
  return <></>;
};

export default TempComponentForFetch;
