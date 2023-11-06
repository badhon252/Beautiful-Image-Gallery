import React, { ReactNode } from "react";

// Define the type for the props.
interface GridProps {
  children: ReactNode;
  columns: number;
}

// Use React.FC to define a functional component with TypeScript.
export const Grid: React.FC<GridProps> = ({ children, columns }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: 10,
        padding: 10,
      }}
    >
      {children}
    </div>
  );
};
