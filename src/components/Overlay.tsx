import { BookContext } from "../context/Context";
import React, { useContext } from "react";

interface Props {
  children: React.ReactNode;
}
export default function Overlay({ children }: Props) {
  const { setTocDropdown, setThemeDropdown } = useContext(BookContext);
  return (
    <div
      onClick={() => {
        setTocDropdown(false);
        setThemeDropdown(false);
      }}
    >
      {children}
    </div>
  );
}
