import { HTMLAttributes } from "react";
import CardT from "../types/CardT";

interface Props {
  card: CardT;
  draggable: boolean;
}

const PlayingCard = ({ card, draggable }: Props) => {
  const dragProp: HTMLAttributes<HTMLDivElement> = draggable
    ? { draggable: false }
    : {};

  return (
    <img
      className="playing-card"
      id={card.id}
      src={card.imgSrc}
      height={170}
      width={121}
      {...dragProp}
      draggable={false}
    />
  );
};

export default PlayingCard;
