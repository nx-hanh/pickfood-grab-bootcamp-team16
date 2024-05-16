import Card from "@/components/home/Card";
import React from "react";
import { useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
const ACTIONS_TYPE = {
  LIKE: 'like',
  DISLIKE: 'dislike',
  SKIP: 'skip',
  NONE: 'none'
}
interface Card {
  image: string;
  name: string;
  address: string;
  price: string;
  categories: string[];
  description: string;
}
interface CardDeckProps {
  cards: Card[];//list of cards to show in deck, the last card is on top
  action: string;//handle action button click
  setAction: React.Dispatch<React.SetStateAction<string>>;//set action button when done swipe
  setIsSwiping: React.Dispatch<React.SetStateAction<string>>;//set isSwiping when swipe
  handleAction: (action: string) => void;//do action when swipe done
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

const CardDeck: React.FC<CardDeckProps> = ({ cards, action, setAction,setIsSwiping, handleAction}) => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [readyGone, setReadyGone] = useState(0);
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
      if (!active && readyGone !== 0) {
        gone.add(index);
      }
      const curXDir = readyGone !== 0 ? readyGone : xDir;
      if (gone.has(index)){
        if(curXDir === 1){
          handleAction(ACTIONS_TYPE.LIKE);
        }
        if(curXDir === -1){
          handleAction(ACTIONS_TYPE.SKIP);
        }
        setReadyGone(0);
      }
      api.start((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (400 + window.innerWidth) * curXDir : active ? mx : 0; // When a card is gone it fly out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = active ? 1.1 : 1; // Active cards lift up a bit
        if (mx > 100 && xDir === 1 && !isGone) {
          setIsSwiping(ACTIONS_TYPE.LIKE);
          setReadyGone(1);
        }
        if (mx < -100 && xDir === -1 && !isGone) {
          setIsSwiping(ACTIONS_TYPE.SKIP);
          setReadyGone(-1);
        }
        //when card is not swipe enough or not active, reset isSwiping
        if ((x < 100 && x > -100 && !active) || isGone) {
          setIsSwiping(ACTIONS_TYPE.NONE);
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
    //TODO: fetch new cards when only 10 cards left
    setTimeout(() => {
      gone.clear();
      api.start((i) => to(i));
    }, 600);
  };
  //this is for action button click
  if (action === ACTIONS_TYPE.LIKE) {
    //swipe right when action button is clicked
    const curIndex = cards.length - 1 - gone.size;
    gone.add(curIndex);
    handleAction(ACTIONS_TYPE.LIKE);
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
    setAction(ACTIONS_TYPE.NONE);
  }
  if (action === ACTIONS_TYPE.SKIP) {
    //swipe left when action button is clicked
    const curIndex = cards.length - 1 - gone.size;
    gone.add(curIndex);
    handleAction(ACTIONS_TYPE.SKIP);
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
    setAction(ACTIONS_TYPE.NONE);
  }
  if (action === ACTIONS_TYPE.DISLIKE) {
    //swipe left when action button is clicked
    const curIndex = cards.length - 1 - gone.size;
    gone.add(curIndex);
    handleAction(ACTIONS_TYPE.DISLIKE);
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
    setAction(ACTIONS_TYPE.NONE);
  }

  return (
    <div className="relative h-full w-full flex justify-center items-center max-w-screen-sm mx-auto overflow-hidden touch-none">
      {props.map(({ x, y, rot, scale }, index) => (
        <animated.div
          key={index}
          className="absolute w-full h-full touch-none will-change-transform placeholder:flex justify-center items-center"
          style={{
            x,
            y,
          }}
        >
          <animated.div
            {...bind(index)}
            className="h-full w-full touch-none will-change-transform"
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
