import { ReaderContext } from "../../context/ReaderContext";
import React, { useContext } from "react";

interface Props {
  fontSizeDropDown: boolean | null;
  setFontSizeDropDown: (fontSizeDropDown: boolean) => void;
  setBackgroundDropdown: (backgroundDropdown: boolean) => void;
  setFontFamilyDropdown: (fontFamilyDropdown: boolean) => void;
}

export default function FontSize({
  fontSizeDropDown,
  setFontSizeDropDown,
  setBackgroundDropdown,
  setFontFamilyDropdown,
}: Props) {
  const { fontSize, setFontSize } = useContext(ReaderContext);
  return (
    <div className="flex gap-3 justify-between items-center">
      <h1>Font Size</h1>
      <div className="flex text-[25px] gap-5">
        <span
          className="border w-12 py-1 px-3 text-center rounded cursor-pointer hover:bg-gray-200 hover:text-black"
          onClick={() => fontSize !== null && fontSize > 9 && setFontSize(fontSize - 4)}
        >
          -
        </span>
        <span
          className="border w-12 py-1 px-3 text-center rounded cursor-pointer hover:bg-gray-200 hover:text-black"
          onClick={() => fontSize !== null && fontSize < 49 && setFontSize(fontSize + 4)}
        >
          +
        </span>
      </div>
    </div>
  );
}
