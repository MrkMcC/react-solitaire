import CardT from "./CardT";

//A zone is anything that can contain one or more cards.
//Zones cannot contain other zones and a card can only be in one zone at a time.
type TableT = {
  //sorted bottom to top
  [zone: string]: CardT[];
};

export default TableT;
