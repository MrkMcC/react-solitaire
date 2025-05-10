import Constants from "../Constants";
import Suit from "../enums/Suit";
import CardT from "../types/CardT";

const getSortingColumnKey = (index: number): string => {
  return Constants.ZONE.COLUMNS_PREFIX + index;
};

const getSortingColumnKeys = (): string[] => {
  return new Array<String>(7)
    .fill("")
    .map((_v, index) => getSortingColumnKey(index + 1));
};

const getFoundationId = (suit: Suit | string): string => {
  return Constants.ZONE.FOUNDATION_PREFIX + suit;
};

const getFoundationIds = (): string[] => {
  return Object.values(Suit).map((suit) => getFoundationId(suit));
};

const getTopCard = (zone: CardT[] | undefined): CardT | undefined => {
  return !!zone ? zone[zone.length - 1] : undefined;
};

const getStack = (bottomCardId: string, zone: CardT[]): CardT[] => {
  const bottomCardIndex = zone.findIndex((card) => card.id === bottomCardId);
  return zone.slice(bottomCardIndex);
};

const ZoneHelper = {
  GetSortingColumnKey: getSortingColumnKey,
  GetSortingColumnKeys: getSortingColumnKeys,
  GetFoundationId: getFoundationId,
  GetFoundationIds: getFoundationIds,
  GetTopCard: getTopCard,
  GetStack: getStack,
};

export default ZoneHelper;
