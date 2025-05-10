import FaceDownCard from "./FaceDownCard";

interface Props {
  hasCards: boolean;
  onClick: () => void;
}

const Deck = ({ hasCards, onClick }: Props) => {
  return (
    <div className="deck card-sized" onClick={onClick}>
      <div className="pile-base" />
      {hasCards && <FaceDownCard />}
    </div>
  );
};

export default Deck;
