import React, { Ref, CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Photo } from "./Photo";

// Define the type for the props.
// Define the type for the props.
interface SortablePhotoProps {
  url: string;
  index: number; // Add index with a default value
  faded: boolean; // Add faded with a default value
  // Include other props as needed
}

export const SortablePhoto: React.FC<SortablePhotoProps> = (props) => {
  const sortable = useSortable({ id: props.url });
  const { listeners, setNodeRef, transform, transition } = sortable;

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Photo
      ref={setNodeRef as Ref<HTMLDivElement>}
      style={style}
      {...props}
      {...listeners}
    />
  );
};
