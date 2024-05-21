import Card from "@/components/home/Card";
import React from "react";
import { useState, useEffect } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { Dish, asyncUpdateDishes, selectRecommendedDishes, selectStatus } from "@/lib/redux/features/dishes/dishesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import CardDeckSkeleton from "@/components/home/CardDeckSkeleton";
const ACTIONS_TYPE = {
  LIKE: 'like',
  DISLIKE: 'dislike',
  SKIP: 'skip',
  NONE: 'none'
}
const UPDATE_DECK_WHEN = 1;
const FETCH_API_WHEN = 20;
const NUMBER_RECOMMENDED = 20;

interface CardDeckProps {
  action: string;//handle action button click
  setAction: React.Dispatch<React.SetStateAction<string>>;//set action button when done swipe
  setIsSwiping: React.Dispatch<React.SetStateAction<string>>;//set isSwiping when swipe
  handleAction: (action: string, dish: Dish) => void;//do action when swipe done
}
// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: 0,
  delay: 0,
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1, y: 0 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(0deg) rotateY(0deg) rotateZ(${r}deg) scale(${s})`;

const CardDeck: React.FC<CardDeckProps> = ({ action, setAction, setIsSwiping, handleAction }) => {
  const cardStore = useAppSelector(selectRecommendedDishes);
  const storeStatus = useAppSelector(selectStatus);

  const dispatch = useAppDispatch();
  const [cards, setCards] = useState<Dish[]>([]);
  useEffect(() => {
    if (cards.length < 1 && cardStore.length > 1) {
      setCards(cardStore.slice(-NUMBER_RECOMMENDED));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardStore, cards.length]);
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [readyGone, setReadyGone] = useState(0);
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
    immediate: true,
  }
  ), [cards]); // Create a bunch of springs using the helpers above
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
      if (gone.has(index)) {
        if (curXDir === 1) {
          handleAction(ACTIONS_TYPE.LIKE, cards[index]);
        }
        if (curXDir === -1) {
          handleAction(ACTIONS_TYPE.SKIP, cards[index]);
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
        if (mx < 100 && mx > -100 || isGone) {
          setIsSwiping(ACTIONS_TYPE.NONE);
          setReadyGone(0);
        }
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!active && (gone.size + UPDATE_DECK_WHEN) === cards.length) handleFewCard();
    }
  );
  const handleFewCard = () => {
    const newCards = cardStore.slice(0, cardStore.length - 1);
    setCards(newCards.slice(-NUMBER_RECOMMENDED))
    gone.clear();
  };
  //this is for action button click
  useEffect(() => {
    if (action === ACTIONS_TYPE.LIKE) {
      //swipe right when action button is clicked
      const curIndex = cards.length - 1 - gone.size;
      gone.add(curIndex);
      api.start((i) => {
        if (curIndex !== i) return;
        const isGone = gone.has(curIndex);
        const x = isGone ? (400 + window.innerWidth) * 1 : 0;
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
      if ((gone.size + UPDATE_DECK_WHEN) === cards.length) handleFewCard();
      handleAction(ACTIONS_TYPE.LIKE, cards[curIndex]);
      setAction(ACTIONS_TYPE.NONE);
    }
    if (action === ACTIONS_TYPE.SKIP) {
      //swipe left when action button is clicked
      const curIndex = cards.length - 1 - gone.size;
      gone.add(curIndex);
      api.start((i) => {
        if (curIndex !== i) return;
        const isGone = gone.has(curIndex);
        const x = isGone ? (400 + window.innerWidth) * -1 : 0;
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
      handleAction(ACTIONS_TYPE.SKIP, cards[curIndex]);
      setAction(ACTIONS_TYPE.NONE);
      if ((gone.size + UPDATE_DECK_WHEN) === cards.length) handleFewCard();
    }
    if (action === ACTIONS_TYPE.DISLIKE) {
      //swipe left when action button is clicked
      const curIndex = cards.length - 1 - gone.size;
      gone.add(curIndex);
      api.start((i) => {
        if (curIndex !== i) return;
        const isGone = gone.has(curIndex);
        const x = isGone ? (400 + window.innerWidth) * -1 : 0;
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
      if ((gone.size + UPDATE_DECK_WHEN) === cards.length) handleFewCard();
      handleAction(ACTIONS_TYPE.DISLIKE, cards[curIndex]);
      setAction(ACTIONS_TYPE.NONE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  if (cardStore.length <= FETCH_API_WHEN && storeStatus !== "loading" && storeStatus !== "nomore") {
    if (typeof window !== "undefined") {
      const fetchNoLocation = () => {
        const token = localStorage.getItem("token")
        const isTokenExist = token && token !== "undefined" && token !== "" && token !== "null";
        if (isTokenExist) dispatch(asyncUpdateDishes({
          lat: -1,
          long: -1,
          token: token
        }));
      }
      const fetchLocation = (lat: number, long: number) => {
        const token = localStorage.getItem("token")
        const isTokenExist = token && token !== "undefined" && token !== "" && token !== "null";
        if (isTokenExist) dispatch(asyncUpdateDishes({
          lat: lat,
          long: long,
          token: token
        }));
      }
      if (navigator.geolocation) {
        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
          if (permissionStatus.state === 'prompt') {
            navigator.geolocation.getCurrentPosition((position) => {
              fetchLocation(position.coords.latitude, position.coords.longitude);
            }, () => {
              fetchNoLocation();
            })
          }
          else if (permissionStatus.state === 'denied') {
            fetchNoLocation();
          }
          else {
            navigator.geolocation.getCurrentPosition((position) => {
              fetchLocation(position.coords.latitude, position.coords.longitude);
            })
          }
        });
      }
    }
  }
  const isPrepareData = cardStore.length !== 0;
  useEffect(() => {
    if (storeStatus === "failed" && !isPrepareData) {
      throw Error();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeStatus])
  return (<>
    {isPrepareData ? (
      <div className="relative h-full w-screen flex justify-center items-center max-w-screen-sm mx-auto touch-none overflow-y-scroll no-scrollbar">
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
              {cards[index] && <Card {...cards[index]} />}
            </animated.div>
          </animated.div>
        ))}
      </div>) : (
      <>
        {storeStatus === "loading" && <CardDeckSkeleton />}
        {storeStatus === "nomore" && <div className="h-full w-full flex flex-col items-center justify-center">
          <p className="font-semibold">Hiện tại không tìm thấy thêm món ăn phù hợp!</p>
          <p>Hãy quay lại sau!</p>
        </div>}
      </>)
    }</>
  );
};

export default CardDeck;
