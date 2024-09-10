import React from "react";
import { IoMdClose } from "react-icons/io";

interface Props {
  handleModal: () => void;
}

export default function Info({ handleModal }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/[0.2] flex items-center justify-center">
      <div className="flex flex-col shadow bg-white p-5 w-[550px] rounded-md">
        <div className="flex items-center justify-between border-b pb-5">
          <h1 className="text-[20px] font-bold">Info/Updates</h1>
          <span
            className="text-[18px] flex items-center hover:bg-neutral-100 p-1 rounded-full"
            onClick={handleModal}
          >
            <IoMdClose />
          </span>
        </div>

        <div className="mt-5 ">
          <p className="border-b pb-2">
            Book reader is an e-book reader designed and created to effectively accept
            epub extension and read the book at user's leisure. Its features include:{" "}
            <br />
            - Upload epub files <br />
            - Read uploaded files <br />
            - Delete uploaded files <br />
            - View book information <br />
            - Modify the reader settings <br />
          </p>
          <div className="mt-5">
            <div className="">
              <h2 className="font-medium text-[18px]">
                Current Version <span>1.0.0</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
