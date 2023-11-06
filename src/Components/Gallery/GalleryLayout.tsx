import React, { useState } from "react";
import {
  DndContext,
  MouseSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { SortableContext } from "@dnd-kit/sortable";

import { Grid } from "./Grid.js";
import { SortablePhoto } from "./SortablePhoto.js";
import { Photo } from "./Photo.js";
import photos from "../../assets/photos.json";

// Define the type for the items array.
type PhotoItem = string;

const GalleryLayout: React.FC = () => {
  const [items, setItems] = useState<PhotoItem[]>(photos);
  const [activeId, setActiveId] = useState<PhotoItem | null>(null);

  // Define the type for sensors.
  const sensors = useSensors(useSensor(MouseSensor));

  return (
    <Grid columns={5}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items}>
          {items.map((item: PhotoItem, index: number) => (
            <SortablePhoto key={item} url={item} index={index} />
          ))}
        </SortableContext>

        <DragOverlay adjustScale={true}>
          {activeId ? (
            <Photo
              url={activeId}
              index={items.indexOf(activeId)}
              faded={false}
              style={undefined} // You can add a proper type for the style if needed.
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      <div>upload</div>
    </Grid>
  );

  // Define the event types for drag start and drag end.
  function handleDragStart(event: { active: { id: PhotoItem } }) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: {
    active: { id: PhotoItem };
    over: { id: PhotoItem };
  }) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }
};

export default GalleryLayout;
