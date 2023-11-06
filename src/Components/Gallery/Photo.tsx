import React, { forwardRef, HTMLProps } from "react";

// Define the type for the props.
interface PhotoProps extends HTMLProps<HTMLDivElement> {
  url: string;
  index: number;
  faded: boolean;
  style: React.CSSProperties;
  // Include other props as needed
}

// Use forwardRef to handle the ref forwarding.
export const Photo = forwardRef<HTMLDivElement, PhotoProps>(
  ({ url, index, faded, style, ...props }, ref) => {
    const inlineStyles: React.CSSProperties = {
      opacity: faded ? "0.1" : "1",
      transformOrigin: "0 0",
      height: index === 0 ? 410 : 200,
      gridRowStart: index === 0 ? "span 2" : "auto",
      gridColumnStart: index === 0 ? "span 2" : "auto",
      backgroundImage: `url("${url}")`,
      padding: "10px",
      // backgroundSize: "cover",

      ...style,
    };

    return (
      <div
        ref={ref}
        style={inlineStyles}
        className="bg-white hover:cursor-grab rounded-lg border border-gray-400 bg-no-repeat bg-center bg-cover"
        {...props}
      ></div>
    );
  }
);
