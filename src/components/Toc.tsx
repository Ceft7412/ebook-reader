import { BookContext } from "../context/Context";
import { ReaderContext } from "../context/ReaderContext";
import Epub from "epubjs";
import React, { useContext, useEffect } from "react";

type Toc = {
  label?: string;
  href?: string;
};
export default function Toc() {
  const { bookToRead, setSectionDisplay, setTocDropdown, tocDropdown } =
    useContext(BookContext);
  const { backgroundTheme } = useContext(ReaderContext);
  const [toc, setToc] = React.useState<Toc[] | null>([]);
  useEffect(() => {
    if (bookToRead) {
      const book = Epub(bookToRead.link ?? "");
      book.loaded.navigation.then(() => {
        const tOc = book.navigation.toc;
        setToc(tOc);
      });
    }
  }, [bookToRead]);

  return (
    <div
      className={`${
        tocDropdown ? "block" : "hidden"
      } fixed top-0 right-0 bottom-0 left-0 `}
    >
      <div
        className={`${
          backgroundTheme === "light"
            ? "bg-white border-neutral-200 text-neutral-600"
            : "bg-[#313131]  border-gray-800 text-white/[.85]"
        } absolute top-10  shadow rounded  left-14 h-[400px] overflow-y-auto w-[250px] border`}
      >
        {toc?.map((item, index) => (
          <div
            key={index}
            className={`hover:text-neutral-900 px-5 py-2 hover:bg-neutral-100 cursor-pointer`}
            onClick={() => {
              setSectionDisplay(item.href ?? "");
              setTocDropdown(false);
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
