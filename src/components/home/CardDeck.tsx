import Card from "@/components/home/Card";
import React from "react";
import { useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

interface Card {
  image: string;
  name: string;
  address: string;
  price: string;
}
interface CardDeckProps {
  cards: Card[];
  action: string;
  setAction: React.Dispatch<React.SetStateAction<string>>;
}
// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: 0,
  delay: 100,
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1, y: 0 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(0deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

const CardDeck: React.FC<CardDeckProps> = ({ cards, action, setAction }) => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
    }) => {
      const trigger = vx > 0.2; // If you flick hard enough it should trigger the card to fly out
      if (!active && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0; // When a card is gone it fly out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = active ? 1.1 : 1; // Active cards lift up a bit
        if (x > 200 && xDir === 1) {
          console.log("like");
          //TODO: handle like action
        }
        if (x < -200 && xDir === -1) {
          console.log("dislike");
          //TODO: handle dislike action
        }
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!active && gone.size === cards.length) handleAllGone();
    }
  );
  const handleAllGone = () => {
    //TODO: Show action for user choice to view again or not
    setTimeout(() => {
      gone.clear();
      api.start((i) => to(i));
    }, 600);
  };
  if (action === "like") {
    //swipe right action
    const curIndex = cards.length - 1 - gone.size;
    gone.add(curIndex);
    console.log('like');
    api.start((i) => {
      if (curIndex !== i) return;
      const isGone = gone.has(curIndex);
      const x = isGone ? (200 + window.innerWidth) * 1 : 0;
      const rot = 0 / 100 + (isGone ? 1 * 10 * 1 : 0);
      const scale = 1;
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: 800 },
      };
    });
    if (gone.size === cards.length) handleAllGone();
    setAction("none");
  }
  if (action === "dislike") {
    //swipe left action
    const curIndex = cards.length - 1 - gone.size;
    gone.add(curIndex);
    console.log('dislike')
    api.start((i) => {
      if (curIndex !== i) return;
      const isGone = gone.has(curIndex);
      const x = isGone ? (200 + window.innerWidth) * -1 : 0;
      const rot = 0 / 100 + (isGone ? -1 * 10 * 1 : 0);
      const scale = 1;
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: 800 },
      };
    });
    if (gone.size === cards.length) handleAllGone();
    setAction("none");
  }

  return (
    <div className="relative h-[510px] w-full flex justify-center items-center max-w-screen-sm mx-auto overflow-hidden touch-none my-4">
      {props.map(({ x, y, rot, scale }, index) => (
        <animated.div
          key={index}
          className="absolute w-full h-[510px] touch-none will-change-transform placeholder:flex justify-center items-center pt-2"
          style={{
            x,
            y,
          }}
        >
          <animated.div
            {...bind(index)}
            className="h-[480px] w-full touch-none will-change-transform p-4"
            style={{
              transform: interpolate([rot, scale], trans),
            }}
          >
            <Card {...cards[index]} />
          </animated.div>
        </animated.div>
      ))}
    </div>
  );
};

export default CardDeck;
