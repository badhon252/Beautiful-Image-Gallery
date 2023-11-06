import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";

// Define the type for an image.
interface Image {
  id: string;
  src: string;
  isFeatured: boolean;
}

// Define the type for the props.
interface ImageItemProps {
  image: Image;
  index: number;
}

const ImageItem: React.FC<ImageItemProps> = ({ image }) => {
  const { isFeatured } = image;

  // Use useDraggable to enable dragging functionality.
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: image.id,
    });

  // Use useDroppable to enable dropping functionality.
  const { isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
    id: image.id,
  });

  // Define the dragStyle with optional transform and zIndex properties.
  const dragStyle: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 1 : undefined,
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node); // Set the draggable node reference
        setDroppableNodeRef(node); // Set the droppable node reference
      }}
      {...attributes}
      {...listeners}
      style={dragStyle}
      className={`bg-white cursor-pointer rounded-lg border hover:border-dashed border-gray-300 ${
        isFeatured ? "row-span-2 col-span-2" : ""
      }`}
    >
      <img src={image.src} alt={`Image ${image.id}`} className="rounded-lg" />
      {isOver && <div style={{ width: "100%", height: "10px" }}></div>}
    </div>
  );
};

export default ImageItem;
