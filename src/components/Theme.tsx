import { BookContext } from "../context/Context";
import React, { useContext, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

import { ReaderContext } from "../context/ReaderContext";
import ScreenLayout from "./visualOptions/ScreenLayout";
import BackgroundTheme from "./visualOptions/BackgroundTheme";
import FontFamily from "./visualOptions/FontFamily";
import FontSize from "./visualOptions/FontSize";

export default function Theme() {
  const [backgroundDropdown, setBackgroundDropdown] = React.useState<boolean | null>(
    false
  );
  const [fontFamilyDropdown, setFontFamilyDropdown] = React.useState<boolean | null>(
    false
  );
  const { themeDropdown, setThemeDropdown } = useContext(BookContext);
  const { backgroundTheme } = useContext(ReaderContext);

  // This useEffect hook will run when the themeDropdown state changes and close the dropdown
  useEffect(() => {
    !themeDropdown && setBackgroundDropdown(false);
  }, [themeDropdown]);

  return (
    <div
      className={`${
        themeDropdown ? "block" : "hidden"
      } fixed top-0 right-0 bottom-0 left-0`}
    >
      <div
        className={`${
          backgroundTheme === "light"
            ? "bg-white border-neutral-300 "
            : "bg-[#313131] text-white/[.85] border-gray-800"
        } absolute right-8 top-10 shadow rounded w-[250px] sm:w-[300px]  border`}
        onClick={(e) => {
          e.stopPropagation();
          setBackgroundDropdown(false);
          setFontFamilyDropdown(false);
        }}
      >
        <div className="flex items-center justify-between px-5 py-3  border-b">
          <h1>Visual Options</h1>
          <span
            className={`${
              backgroundTheme === "light"
                ? "hover:bg-neutral-200"
                : "hover:bg-black/[0.8] hover:text-white"
            } text-[22px]  rounded-full p-1`}
            onClick={() => setThemeDropdown(false)}
          >
            <IoMdClose />
          </span>
        </div>
        <div className="px-5 py-3 flex flex-col gap-5">
          <ScreenLayout />
          <BackgroundTheme
            backgroundDropdown={backgroundDropdown}
            setBackgroundDropdown={setBackgroundDropdown}
            setFontFamilyDropdown={setFontFamilyDropdown}
          />
          <FontFamily
            fontFamilyDropdown={fontFamilyDropdown}
            setFontFamilyDropdown={setFontFamilyDropdown}
            setBackgroundDropdown={setBackgroundDropdown}
          />
          <FontSize />
        </div>
      </div>
    </div>
  );
}
