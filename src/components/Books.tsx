"use client";
import React, { useContext } from "react";
import { BookContext } from "../context/Context";
import { Book } from "../constants/Book";
import { slugify } from "../utils/slugify";
import { useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { deleteBookFromIndexedDB } from "../utils/db";
import InfoBook from "./modal/InfoBook";

export default function Books() {
  const { setBooksEffect, booksEffect } = useContext(BookContext);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalToOpen, setModalToOpen] = React.useState<number | null>(null);
  const [bookSelected, setBookSelected] = React.useState<Book | null>(null);
  const [bookInfo, setBookInfo] = React.useState<number | null>(null);
  const navigate = useNavigate();
  const [isBookInfoModalOpen, setIsBookInfoModalOpen] = React.useState<boolean>(false);
  console.log(": ", isBookInfoModalOpen);
  const handleClick = (title: string, id: string) => {
    navigate(`/reader/${slugify(title ?? "")}/${id ?? ""}`);
  };

  // const deleteInFileSystem = async (filename: string, id: string) => {
  //   const res = await fetch(`/api/delete-book/${filename}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (res.status === 200) {
  //     const updatedBooksEffect = booksEffect?.filter((book) => book.id !== id);
  //     setBooksEffect(updatedBooksEffect ?? null);
  //   }
  // };

  const deleteInIndexedDB = async (id: number, stateId: number) => {
    console.log("id: ", id);
    console.log("Deleteid: ", id);
    deleteBookFromIndexedDB(id);
    const updatedBooksEffect = booksEffect?.filter((book, index) => index !== stateId);
    setBooksEffect(updatedBooksEffect ?? null);
  };

  const handleInfoBook = (index: number) => {
    const book = booksEffect?.[index];
    if (book) {
      setBookSelected(book);
      setIsBookInfoModalOpen(true);
      setBookInfo(index);
    }
  };
  return (
    <div className="border-t border-black/[0.18] mx-auto w-full">
      {booksEffect?.length === 0 ? (
        <p className="mt-10 text-[18px]">
          No books available. Currently, we are only accepting ePub files.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 mt-5">
          {booksEffect?.map((book, index) => (
            <div
              key={index}
              className={`w-36 sm:w-52  ${
                isModalOpen ? "" : "sm:hover:scale-105"
              } sm:hover:bg-neutral-100 p-0 sm:p-2 rounded-md cursor-pointer  mx-auto transition-transform duration-500`}
              onClick={() => handleClick(book.title ?? "", book.id ?? "")}
            >
              <div className="h-48 w-36 sm:w-48 sm:h-56 rounded shadow-md mb-5 border-black/[0.7]">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="rounded w-full h-full"
                />
              </div>
              <div className=" flex justify-between">
                <div className="flex flex-col">
                  <h2 className="mb-1">{book.title}</h2>
                  <span className=" text-neutral-500 text-[14px]">{book.author}</span>
                </div>
                <div>
                  <span
                    className="relative hover:bg-neutral-300 flex items-center rounded-full p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(!isModalOpen);
                      setModalToOpen(index ?? "");
                    }}
                  >
                    <HiDotsVertical />
                    {isModalOpen && modalToOpen === index && (
                      <>
                        <div
                          className="fixed top-0 right-0 bottom-0 left-0 z-40"
                          onClick={() => {
                            setIsModalOpen(!isModalOpen);
                          }}
                        />
                        <div className="modal-actions shadow bg-white absolute bottom-6 rounded z-50 -right-33 py-2 w-[170px] flex flex-col gap-1">
                          <span
                            className="p-2 hover:bg-neutral-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleInfoBook(index);
                            }}
                          >
                            About this book
                          </span>

                          <span
                            className="p-2 hover:bg-neutral-100"
                            onClick={() =>
                              deleteInIndexedDB(Number(book.bookIndexedDBId), index ?? "")
                            }
                          >
                            Delete this book
                          </span>
                        </div>
                      </>
                    )}
                  </span>
                  {bookInfo === index && isBookInfoModalOpen && (
                    <InfoBook
                      bookSelected={bookSelected}
                      setIsBookInfoModalOpen={setIsBookInfoModalOpen}
                      setIsModalOpen={setIsModalOpen}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
