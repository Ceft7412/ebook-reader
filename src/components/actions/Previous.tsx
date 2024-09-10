import React from "react";
import { FiChevronLeft } from "react-icons/fi";
interface Props {
  handlePrevClick?: React.MouseEventHandler<HTMLDivElement>;
}
export default function Previous({ handlePrevClick }: Props) {
  return (
    <div
      className="fixed left-2 bottom-2 sm:bottom-auto sm:left-2 sm:top-[50%] z-30 sm:-translate-y-[50%] p-2 flex items-center rounded-full bg-neutral-100 text-[18px] hover:bg-neutral-300 "
      onClick={handlePrevClick}
    >
      <FiChevronLeft />
    </div>
  );
}
