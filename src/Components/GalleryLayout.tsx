import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { initialImages } from "./Image";

interface Image {
  id: string;
  src: string;
  isFeatured: boolean;
}

const GalleryLayout: React.FC = () => {
  const [images, setImages] = useState<Image[]>(initialImages);

  const onDragEndHandler = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    const items = Array.from(images);

    const [draggedItem] = items.splice(sourceIndex, 1);
    items.splice(destIndex, 0, draggedItem);

    // Update the isFeatured property for images
    items.forEach((image, index) => {
      image.isFeatured = index === 0;
    });

    // Update the order of images in the state
    setImages(items);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Image Gallery</h2>

      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId="images" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-rows-3 grid-cols-5 gap-4 "
            >
              {images.map(({ id, src, isFeatured }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-white cursor-pointer rounded-lg border  border-gray-300 ${
                          isFeatured ? "row-span-2 col-span-2" : ""
                        }`}
                      >
                        <img
                          src={src}
                          alt={`Image ${id}`}
                          className="rounded-lg"
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default GalleryLayout;
