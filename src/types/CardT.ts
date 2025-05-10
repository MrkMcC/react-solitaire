import Suit from "../enums/Suit";
import CardValueT from "./CardValueT";

type CardT = {
  id: string;
  suit: Suit;
  value: CardValueT;
  imgSrc: string;
};

export default CardT;
