import { useState } from "react";
import Constants from "../Constants";
import CardT from "../types/CardT";
import CardStack from "./CardStack";
import DropZone from "./common/DropZone";
import FaceDownCard from "./FaceDownCard";

interface Props {
  cards: CardT[];
  onClick: () => void;
  onCardDrop: (cardId: string, origin: string) => void;
}

const Deck = ({ cards, onClick, onCardDrop }: Props) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleDrop = (cardId: string, origin: string) => {
    if (cards.length === 0 && !isRevealed) setIsRevealed(true);
    onCardDrop(cardId, origin);
  };

  if (isRevealed && cards.length > 1) {
    setIsRevealed(false);
  }

  const handleClick = () => {
    if (!isRevealed) onClick();
  };

  return (
    <DropZone
      zoneId={Constants.ZONE.DECK}
      className="pile card-width"
      onCardDrop={handleDrop}
    >
      <div className="deck card-sized" onClick={handleClick}>
        <div className="pile-base" />
        {!isRevealed && cards.length > 0 && <FaceDownCard />}
        {isRevealed && cards.length === 1 && (
          <CardStack
            zoneId={Constants.ZONE.DECK}
            cards={cards.slice(0, 1)}
            allowDragMultiple={false}
          />
        )}
      </div>
    </DropZone>
  );
};

export default Deck;
