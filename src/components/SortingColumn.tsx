import CardT from "../types/CardT";
import CardStack from "./CardStack";
import DropZone from "./common/DropZone";

interface Props {
  zoneId: string;
  cards: CardT[];
  onCardDrop: (cardId: string, origin: string, target: string) => void;
}

const SortingColumn = ({ zoneId, cards = [], onCardDrop }: Props) => {
  return (
    <DropZone
      zoneId={zoneId}
      className="pile vertical-stack card-width"
      onCardDrop={onCardDrop}
    >
      <div className="pile-base card-sized"></div>
      {cards.length > 0 && (
        <CardStack zoneId={zoneId} cards={cards} allowDragMultiple={true} />
      )}
    </DropZone>
  );
};

export default SortingColumn;
