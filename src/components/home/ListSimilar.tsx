import ListSimilarItem from "@/components/home/ListSimilarItem";
import React from "react";

const ListSimilar = () => {
  const ListSimilarData = [
    {
      image:
        "https://picsum.photos/100",
      name: "This is a long title for a item that is displayed in the list",
      address: "This is a long address for a item that is displayed in the list",
      price: "This is a long price for a item that is displayed in the list",
    },
    {
      image:
        "https://picsum.photos/100",
      name: "Card 2",
      address: "Address 2",
      price: "200",
    },
    {
      image:
        "https://picsum.photos/100",
      name: "Card 3",
      address: "Address 3",
      price: "300",
    },
    {
      image:
        "https://picsum.photos/100",
      name: "Card 4",
      address: "Address 4",
      price: "400",
    },
    {
      image:
        "https://picsum.photos/100",
      name: "Card 5",
      address: "Address 5",
      price: "500",
    },
    {
      image:
        "https://picsum.photos/100",
      name: "Card 6",
      address: "Address 6",
      price: "600",
    },
  ];

  return (
    <div className="flex flex-col items-start justify-center w-full mb-48 max-w-screen-sm">
      <h2 className="text-lg font-semibold text-primary mb-3 ">
        Xem thêm quán có món này
      </h2>
      {ListSimilarData.map((item, index) => (
        <ListSimilarItem
          key={index}
          image={item.image}
          title={item.name}
          address={item.address}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default ListSimilar;
