import { Book } from "../../constants/Book";
import { IoMdClose } from "react-icons/io";

interface Props {
  bookSelected: Book | null;
  setIsBookInfoModalOpen: (isOpen: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function InfoBook({
  bookSelected,
  setIsBookInfoModalOpen,
  setIsModalOpen,
}: Props) {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/[0.2] z-50 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        setIsBookInfoModalOpen(false);
        setIsModalOpen(false);
      }}
    >
      <div
        className="info-book flex flex-col shadow bg-white p-5 w-[550px] h-[500px] rounded-md overflow-y-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b pb-5">
          <h1 className="text-[20px] font-bold">About the book</h1>
          <span
            className="text-[18px] flex items-center hover:bg-neutral-100 p-1 rounded-full"
            onClick={() => {
              setIsBookInfoModalOpen(false);
              setIsModalOpen(false);
            }}
          >
            <IoMdClose />
          </span>
        </div>

        <div className="mt-5 flex items-center justify-center flex-col">
          <img
            src={bookSelected?.cover}
            alt={bookSelected?.title}
            width={100}
            height={100}
          />
          <div className="mt-2 self-start w-full ">
            <div className="mt-2 flex items-center justify-between px-20 gap-5">
              <h1>Title:</h1>
              <h2 className="font-medium truncate" title={bookSelected?.title}>
                {bookSelected?.title}
              </h2>
            </div>
            <div className="mt-2 flex items-center justify-between px-20 gap-5">
              <h1>Author:</h1>
              {bookSelected?.author ? (
                <h2 className="truncate" title={bookSelected?.author}>
                  {bookSelected?.author}
                </h2>
              ) : (
                <h2 className="truncate text-neutral-600">No author</h2>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between px-20 gap-5">
              <h1>Publisher:</h1>
              {bookSelected?.publisher ? (
                <h2 className="truncate" title={bookSelected?.publisher}>
                  {bookSelected?.publisher}
                </h2>
              ) : (
                <h2 className="truncate text-neutral-600">No publisher</h2>
              )}
            </div>
            <div className="px-10 mt-5 ">
              <h1 className="mb-2">Description:</h1>
              {bookSelected?.description ? (
                <div
                  className="text-justify"
                  dangerouslySetInnerHTML={{ __html: bookSelected?.description ?? "" }}
                />
              ) : (
                <p className="text-neutral-600">No description available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
