import { DragEvent, HTMLAttributes } from "react";
import Constants from "../Constants";
import CardService from "../services/CardService";
import CardT from "../types/CardT";
import PlayingCard from "./PlayingCard";

interface Props {
  zoneId: string;
  cards: CardT[];
  allowDragMultiple: boolean;
}

const CardStack = ({ zoneId, cards, allowDragMultiple }: Props) => {
  const bottomCard = cards[0];
  const remainingCards = cards.slice(1, cards.length);

  const isDraggable =
    (allowDragMultiple || remainingCards.length === 0) &&
    CardService.IsDraggable(cards);

  function dragstartHandler(e: DragEvent<HTMLDivElement>) {
    e.stopPropagation();
    e.dataTransfer.setData(Constants.DRAG_DATA_CARD_ID, bottomCard.id);
    e.dataTransfer.setData(Constants.DRAG_DATA_ORIGIN_ZONE, zoneId);
  }

  const dragProp: HTMLAttributes<HTMLDivElement> = isDraggable
    ? { draggable: true }
    : {};

  return (
    <div className="card-stack" {...dragProp} onDragStart={dragstartHandler}>
      <PlayingCard card={bottomCard} draggable={isDraggable} />
      {remainingCards.length > 0 && (
        <CardStack
          zoneId={zoneId}
          cards={remainingCards}
          allowDragMultiple={allowDragMultiple}
        />
      )}
    </div>
  );
};

export default CardStack;
