import { ReaderContext } from "../../context/ReaderContext";
import { useContext } from "react";
import { VscBook } from "react-icons/vsc";
import { PiNotebook } from "react-icons/pi";

export default function ScreenLayout() {
  const { layout, setLayout } = useContext(ReaderContext);
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-medium">Screen layout</h1>
      <div className="flex gap-1 ">
        <span
          className={`${
            layout === "single" ? "bg-gray-400/[0.3]" : "hover:bg-black/[0.2]"
          } text-[30px] border rounded p-3  `}
          onClick={() => setLayout("single")}
        >
          <PiNotebook />
        </span>
        <span
          className={`${
            layout === "double" ? "bg-gray-400/[0.3]" : " hover:bg-black/[0.2]"
          } text-[30px] border rounded p-3`}
          onClick={() => setLayout("double")}
        >
          <VscBook />
        </span>
      </div>
    </div>
  );
}
