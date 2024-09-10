import { ReaderContext } from "../../context/ReaderContext";
import { useContext } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { FONT_FAMILIES as fontFamilies } from "../../constants/fonts";

interface Props {
  fontFamilyDropdown: boolean | null;
  setFontFamilyDropdown: (fontFamilyDropdown: boolean) => void;
  setBackgroundDropdown: (backgroundDropdown: boolean) => void;
}
export default function FontFamily({
  fontFamilyDropdown,
  setFontFamilyDropdown,
  setBackgroundDropdown,
}: Props) {
  const { fontFamily, setFontFamily, backgroundTheme } = useContext(ReaderContext);

  return (
    <div className="flex justify-between items-center gap-3">
      <h1>Font</h1>
      <div className={`relative w-[190px] flex gap-1 border items-center rounded`}>
        <div
          className="flex gap-1 items-center p-2 w-full justify-between"
          onClick={(e) => {
            e.stopPropagation();
            setBackgroundDropdown(false);
            setFontFamilyDropdown(!fontFamilyDropdown);
          }}
        >
          <span>{fontFamily ? fontFamily : ""}</span>
          <span className={`${fontFamilyDropdown ? "rotate-180" : ""}`}>
            <IoChevronDownOutline />
          </span>
        </div>
        {fontFamilyDropdown && (
          <div
            className={`${
              backgroundTheme === "dark"
                ? "bg-zinc-800 border-gray-600"
                : "  bg-white border-neutral-100"
            } z-20 absolute -bottom-[208px] cursor-default left-0 right-0 flex flex-col rounded shadow border h-52 overflow-y-auto`}
          >
            {fontFamilies.map((font) => (
              <div
                key={font}
                className={`${
                  fontFamily === font
                    ? "bg-neutral-200 text-black"
                    : "hover:bg-black/[0.2]"
                } flex justify-between items-center p-2 `}
                onClick={() => {
                  setFontFamily(font);
                  setFontFamilyDropdown(false);
                }}
              >
                <span>{font}</span>
                <span className={`${font.replace(/\s/g, "")}`}>Aa</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
