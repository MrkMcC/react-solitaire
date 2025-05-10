import { DragEvent, HTMLAttributes } from "react";
import Constants from "../../Constants";

interface Props extends HTMLAttributes<HTMLDivElement> {
  zoneId: string;
  onCardDrop?: (cardId: string, origin: string, target: string) => void;
}

const DropZone = ({ zoneId, onCardDrop, ...defaultProperties }: Props) => {
  function dragoverHandler(e: DragEvent) {
    e.preventDefault();
  }

  function dropHandler(e: DragEvent) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData(Constants.DRAG_DATA_CARD_ID);
    const originZoneId = e.dataTransfer.getData(
      Constants.DRAG_DATA_ORIGIN_ZONE
    );
    if (cardId && onCardDrop) onCardDrop(cardId, originZoneId, zoneId);
  }

  return (
    <div
      {...defaultProperties}
      onDragOver={dragoverHandler}
      onDrop={dropHandler}
      data-role="dropzone"
    />
  );
};

export default DropZone;
