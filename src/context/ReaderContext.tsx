import React from "react";

interface Props {
  children: React.ReactNode;
}

type Context = {
  fontSize: number | null;
  layout: string | null;
  backgroundTheme: string | null;
  fontFamily: string | null;
  setFontFamily: (font: string) => void;
  setBackgroundTheme: (background: string) => void;
  setLayout: (layout: string) => void;
  setFontSize: (size: number) => void;
};

const initialState: Context = {
  fontSize: 18,
  layout: "double",
  backgroundTheme: "light",
  fontFamily: "Times New Roman",
  setFontFamily: () => {},
  setBackgroundTheme: () => {},
  setLayout: () => {},
  setFontSize: () => {},
};
export const ReaderContext = React.createContext<Context>(initialState);
export default function ReaderProvider({ children }: Props) {
  const [fontSize, setFontSize] = React.useState<number | null>(25);
  const [layout, setLayout] = React.useState<string | null>("double");
  const [backgroundTheme, setBackgroundTheme] = React.useState<string | null>("light");
  const [fontFamily, setFontFamily] = React.useState<string | null>("Times New Roman");
  return (
    <ReaderContext.Provider
      value={{
        fontSize,
        layout,
        fontFamily,
        setFontFamily,
        backgroundTheme,
        setBackgroundTheme,
        setLayout,
        setFontSize,
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
}
