import { ReaderContext } from "../context/ReaderContext";
import React, { useContext } from "react";

interface Props {
  readingProgress: number;
}

export default function FooterReader({ readingProgress }: Props) {
  const { backgroundTheme } = useContext(ReaderContext);
  return (
    <div className="text-inherit fixed bottom-0 left-0 right-0 h-12 z-20 flex items-center justify-center">
      <span className={`${backgroundTheme === "dark" ? "text-white/[0.9]" : ""}`}>
        {readingProgress}%
      </span>
    </div>
  );
}
