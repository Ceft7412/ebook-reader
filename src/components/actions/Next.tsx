import { Rendition } from "epubjs";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

import { MouseEventHandler } from "react"; // Import MouseEventHandler

interface ReferencePr {
  handleNextClick?: MouseEventHandler<HTMLDivElement>; // Change the type of handleNextClick
}

export default function Next({ handleNextClick }: ReferencePr) {
  // Update the type of handleNextClick
  return (
    <div
      className="fixed right-2 bottom-2 sm:bottom-auto sm:right-2 sm:top-[50%] sm:-translate-y-[50%] z-30  p-2 flex items-center rounded-full bg-neutral-100 text-[18px] hover:bg-neutral-300 "
      onClick={handleNextClick}
    >
      <FiChevronRight />
    </div>
  );
}
