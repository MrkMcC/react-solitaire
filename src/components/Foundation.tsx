import { ImClubs, ImDiamonds, ImHeart, ImSpades } from "react-icons/im";
import Suit from "../enums/Suit";
import ZoneHelper from "../helper/ZoneHelper";
import CardT from "../types/CardT";
import DropZone from "./common/DropZone";
import PlayingCard from "./PlayingCard";

interface Props {
  suit: Suit;
  cards: CardT[];
  onCardDrop: (
    cardId: string,
    origin: string,
    targetFoundationSuit: Suit
  ) => void;
}

const Foundation = ({ suit, cards = [], onCardDrop }: Props) => {
  const zoneId = ZoneHelper.GetFoundationId(suit);

  const getIcon = () => {
    switch (suit) {
      case Suit.Clubs:
        return <ImClubs />;
      case Suit.Diamonds:
        return <ImDiamonds />;
      case Suit.Hearts:
        return <ImHeart />;
      case Suit.Spades:
        return <ImSpades />;
    }
  };

  const handleCardDrop = (cardId: string, origin: string) => {
    onCardDrop(cardId, origin, suit);
  };

  return (
    <div className={`foundation ${suit} card-sized`}>
      <DropZone zoneId={zoneId} onCardDrop={handleCardDrop}>
        <div className="pile-base">
          <div className="suit-icon">{getIcon()}</div>
        </div>
        {cards.length > 0 && (
          <PlayingCard card={cards[cards.length - 1]} draggable={false} />
        )}
      </DropZone>
    </div>
  );
};

export default Foundation;
