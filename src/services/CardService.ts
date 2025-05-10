import Constants from "../Constants";
import Suit from "../enums/Suit";
import ArrayHelper from "../helper/ArrayHelper";
import MathHelper from "../helper/MathHelper";
import ZoneHelper from "../helper/ZoneHelper";
import CardT from "../types/CardT";
import CardValueT from "../types/CardValueT";
import TableT from "../types/TableT";

let cardPool: CardT[] | undefined;

const populateCardPool = (): CardT[] => {
  let newPool: CardT[] = [];

  const imageImports: Record<string, any> = import.meta.glob(
    "../assets/playing-cards/*.png",
    { eager: true }
  );

  Object.values(Suit).forEach((suit) => {
    for (let value = 1; value <= 13; value++) {
      const imgImport =
        imageImports[`../assets/playing-cards/${suit}_${value}.png`];

      const newCard: CardT = {
        id: `${suit}_${value}`,
        suit: suit,
        value: value as CardValueT,
        imgSrc: imgImport.default,
      };
      newPool.push(newCard);
    }
  });

  return [...(cardPool = newPool)];
};

const getAllCards = () => {
  if (cardPool !== undefined) return cardPool;
  else return populateCardPool();
};

const getCard = (id: string) => {
  return getAllCards().find((c) => c.id === id)!;
};

const createEmptyTable = () => {
  const newTable: TableT = {
    [Constants.ZONE.DECK]: ArrayHelper.Shuffle(CardService.GetAllCards()),
  };

  [
    Constants.ZONE.DISCOVERY,
    ...ZoneHelper.GetSortingColumnKeys(),
    ...ZoneHelper.GetFoundationIds(),
  ].forEach((zoneId) => {
    newTable[zoneId] = [];
  });

  return newTable;
};

const createInitialisedTable = () => {
  const newTable = createEmptyTable();
  const modifiedDeck = [...newTable[Constants.ZONE.DECK]];

  for (
    let dealingStep = 1;
    dealingStep <= MathHelper.CalcTriangular(7);
    dealingStep++
  ) {
    const currentColumnKey = ZoneHelper.GetSortingColumnKey(
      MathHelper.CalcTriangularReverse(dealingStep)
    );
    const card = modifiedDeck.pop()!;
    newTable[currentColumnKey] = [...newTable[currentColumnKey], card];
  }

  return { ...newTable, [Constants.ZONE.DECK]: modifiedDeck };
};

const isDarkSuit = (suit: Suit) => {
  return suit === Suit.Clubs || suit === Suit.Spades;
};

const isDraggable = (stack: CardT[]) => {
  let lastSuit: Suit | undefined = undefined;
  let lastValue: number | undefined = undefined;

  for (let index = 0; index < stack.length; index++) {
    const card = stack[index];
    if (
      lastSuit !== undefined &&
      isDarkSuit(card.suit) === isDarkSuit(lastSuit)
    ) {
      return false;
    }
    if (lastValue !== undefined && card.value !== lastValue - 1) {
      return false;
    }

    lastSuit = card.suit;
    lastValue = card.value;
  }
  return true;
};

const CardService = {
  GetAllCards: getAllCards,
  GetCard: getCard,
  CreateInitialisedTable: createInitialisedTable,
  IsDraggable: isDraggable,
};

export default CardService;
