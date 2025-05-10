import Constants from "../Constants";
import CardT from "../types/CardT";
import CardStack from "./CardStack";

interface Props {
  cards: CardT[];
}

const Discovery = ({ cards = [] }: Props) => {
  return (
    <div className="discovery pile horizontal-stack">
      {cards.length > 0 && (
        <CardStack
          zoneId={Constants.ZONE.DISCOVERY}
          cards={cards}
          allowDragMultiple={false}
        />
      )}
    </div>
  );
};

export default Discovery;
