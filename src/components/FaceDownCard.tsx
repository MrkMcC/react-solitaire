import cardBack from "../assets/playing-cards/back_dark.png";

interface Props {}

const FaceDownCard = ({}: Props) => {
  return (
    <img className="playing-card" src={cardBack} height={170} width={121} />
  );
};

export default FaceDownCard;
