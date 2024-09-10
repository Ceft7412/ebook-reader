import { ReaderContext } from "../../context/ReaderContext";
import React, { useContext } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

interface Props {
  backgroundDropdown: boolean | null;
  setBackgroundDropdown: (backgroundDropdown: boolean) => void;
  setFontFamilyDropdown: (fontFamilyDropdown: boolean) => void;
  setFontSizeDropDown: (fontSizeDropDown: boolean) => void;
}
export default function BackgroundTheme({
  backgroundDropdown,
  setBackgroundDropdown,
  setFontFamilyDropdown,
  setFontSizeDropDown,
}: Props) {
  const { backgroundTheme, setBackgroundTheme } = useContext(ReaderContext);
  return (
    <div className="flex flex-col gap-3">
      <h1>Background Theme</h1>
      <div
        className={`${
          backgroundDropdown ? "border-neutral-500" : ""
        } relative w-[150px] flex gap-1 border items-center rounded`}
      >
        <div
          className="flex gap-1 items-center p-2 w-full justify-between"
          onClick={(e) => {
            e.stopPropagation();
            setFontFamilyDropdown(false);
            setFontSizeDropDown(false);
            setBackgroundDropdown(!backgroundDropdown);
          }}
        >
          <span>
            {backgroundTheme
              ? backgroundTheme.charAt(0).toUpperCase() + backgroundTheme.slice(1)
              : ""}
          </span>
          <span className={`${backgroundDropdown ? "rotate-180" : ""}`}>
            <IoChevronDownOutline />
          </span>
        </div>
        {backgroundDropdown && (
          <div
            className={`${
              backgroundTheme === "dark"
                ? "bg-zinc-800 border-gray-600"
                : "  bg-white border-neutral-100"
            } z-20 absolute -bottom-[83px] cursor-default left-0 right-0 flex flex-col rounded shadow border `}
          >
            <div
              className={`${
                backgroundTheme === "light" ? "bg-neutral-200" : "hover:bg-black/[0.2]"
              } flex justify-between items-center p-2`}
              onClick={(e) => setBackgroundTheme("light")}
            >
              <span>Light</span>
              <span className="w-3 h-3 bg-white border shadow rounded" />
            </div>
            <div
              className={`${
                backgroundTheme === "dark" ? "bg-neutral-600" : "hover:bg-black/[0.2]"
              } flex justify-between items-center p-2`}
              onClick={() => setBackgroundTheme("dark")}
            >
              <span>Dark</span>
              <span className="w-3 h-3 bg-black border shadow rounded" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
