import React, { useContext } from "react";
import { MdToc } from "react-icons/md";
import { RiFontSize } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BookContext } from "../context/Context";
import Toc from "./Toc";
import Theme from "./Theme";
import { ReaderContext } from "../context/ReaderContext";
interface Props {
  title?: string;
  cover?: string;
}

export default function ReaderHeader({ title, cover }: Props) {
  const {
    setBookToRead,
    bookToRead,
    setTocDropdown,
    tocDropdown,
    setThemeDropdown,
    themeDropdown,
  } = useContext(BookContext);
  const { backgroundTheme } = useContext(ReaderContext);
  console.log("backgroundTheme: ", backgroundTheme);

  const handleClick = () => {
    setBookToRead(null);
  };
  return (
    <header
      className={`${
        backgroundTheme === "light" ? "bg-white" : "bg-zinc-800"
      } shadow fixed top-0 left-0 right-0 z-20 flex items-center justify-between h-12 px-3 sm:px-10 font-medium`}
    >
      <div className="flex gap-2 sm:gap-5 items-center relative">
        <Link
          to="/"
          className={`${
            backgroundTheme === "light"
              ? "text-zinc-800 hover:text-neutral-900"
              : "text-white/[0.9] hover:hover:text-white"
          } sm:mr-5 flex items-center text-[18px] `}
          onClick={handleClick}
        >
          <FaArrowLeft />
        </Link>
        <span
          className={`${
            backgroundTheme === "light"
              ? "text-zinc-800 hover:text-neutral-900"
              : "text-white/[0.9] hover:hover:text-white"
          } text-[22px] cursor-pointer `}
          onClick={(e) => {
            e.stopPropagation();
            setTocDropdown(!tocDropdown);
          }}
        >
          <MdToc />
        </span>
        <Toc />
        <h1
          className={`${
            backgroundTheme === "light"
              ? "text-zinc-800 hover:text-neutral-900"
              : "text-white/[0.85] hover:text-white"
          } flex py-2 items-center gap-2`}
        >
          {cover && <img src={cover} alt={title || ""} width={25} height={25} />}
          {title}
        </h1>
      </div>
      <div className="relative">
        <span
          className={`${
            backgroundTheme === "light"
              ? "text-zinc-800 hover:text-neutral-900"
              : "text-white/[0.85] hover:text-white"
          } text-[22px] cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            setThemeDropdown(!themeDropdown);
          }}
        >
          <RiFontSize />
        </span>
        <Theme />
      </div>
    </header>
  );
}
