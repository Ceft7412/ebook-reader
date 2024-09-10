import { useParams } from "react-router-dom";
import { BookContext } from "../context/Context";
import { Book } from "../constants/Book";
import { slugify } from "../utils/slugify";
import { useEffect, useContext, useRef, useState } from "react";
import Epub from "epubjs";
import { Next, Previous } from "../components/actions";
import ReaderHeader from "../components/ReaderHeader";
import Overlay from "../components/Overlay";
import { ReaderContext } from "../context/ReaderContext";
import FooterReader from "../components/FooterReader";

export type Rendition = {
  themes: any;
  book: {
    locations: {
      generate: (length: number) => Promise<any>;
      locationFromCfi: (cfi: string) => any;
      length: () => number;
    };
  };

  on: (event: string, callback: (section: any) => void) => void;
  display: (section?: string) => void; // Updated this line
  flow: (flow: string) => void;
  prev: () => void;
  next: () => void;
};

export default function Reader() {
  const { title, id } = useParams();
  const readerContainerRef = useRef<HTMLDivElement>(null);
  const renditionRef = useRef<Rendition | null>(null);
  const [isBookRendered, setIsBookRendered] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const {
    booksEffect,
    bookToRead,
    handleReadingFile,
    setBookToRead,
    sectionDisplay,
    setTocDropdown,
  } = useContext(BookContext);
  const { fontSize, layout, backgroundTheme, fontFamily } = useContext(ReaderContext);

  /* This useEffect is responsible for setting the section of the book to go to. */
  useEffect(() => {
    if (renditionRef.current && sectionDisplay) {
      renditionRef.current.display(sectionDisplay);
    }
  }, [sectionDisplay]);

  /* This useEffect is responsible for initializing the book */
  useEffect(() => {
    if (id && title && booksEffect) {
      const book = booksEffect.find((book: Book) => slugify(book.title || "") === title);

      if (book) {
        handleReadingFile(book);
      }
      initializeBook();
    }
  }, [id, title, booksEffect, handleReadingFile]);

  useEffect(() => {
    if (isBookRendered) {
      renditionRef.current?.themes.register("custom", {
        "*": {
          "font-size": `${fontSize}px`,
          "font-family": `${fontFamily} !important`,
        },
        body: {
          "font-family": fontFamily,
          padding: "0px 10px",
          color: backgroundTheme === "light" ? "black" : "rgba(255, 255, 255, 0.85)",
        },
        p: {
          "line-height": "1.5",
          "font-family": fontFamily,
          margin: "6px 0",
          // 'text-indent': "2em",
        },
      });
      renditionRef.current?.themes.select("custom");
    }
  }, [isBookRendered, fontSize, backgroundTheme, fontFamily]);

  /* This useEffect is responsible for cleaning up the book */
  useEffect(() => {
    // Preventing the book from being rendered again
    return () => {
      setBookToRead(null);
    };
  }, []);

  /* This useEffect is responsible for setting the layout of the book */
  useEffect(() => {
    if (renditionRef.current) {
      const flow = layout === "single" ? "scrolled-doc" : "paginated";
      renditionRef.current.flow(flow);
    }
  }, [isBookRendered, layout]);

  useEffect(() => {
    renditionRef.current?.on("relocated", (section) => {
      if (section.start) {
        const currentPage = renditionRef.current?.book.locations.locationFromCfi(
          section.start.cfi
        );
        console.log("currentPage: ", currentPage);

        const totalPages = renditionRef.current?.book.locations.length() ?? 0;
        console.log("totalPages: ", totalPages);
        let percentage = 0;
        if (totalPages > 0) {
          percentage = Math.ceil((currentPage / totalPages) * 100);
          console.log("percentage: ", percentage);
        }
        setReadingProgress(percentage);
      }
    });
  }, [renditionRef.current]);
  const initializeBook = async () => {
    if (renditionRef.current !== null) {
      return;
    }
    try {
      if (bookToRead && readerContainerRef.current && bookToRead.link) {
        let book;
        book = Epub(bookToRead.link);
        renditionRef.current = book.renderTo(readerContainerRef.current, {
          width: "100%",
          height: "100%",
        });
        book.opened.then(() => {
          book.locations.generate(1000);
        });
        renditionRef.current.display();

        renditionRef.current.on("displayed", () => {
          setIsBookRendered(true);
        });
      }
    } catch (error) {
      console.error("Error initializing book:", error);
    }
  };

  const handleNextClick = () => {
    if (renditionRef.current) {
      renditionRef.current.next();
    }
  };
  const handlePrevClick = () => {
    if (renditionRef.current) {
      renditionRef.current.prev();
    }
  };
  return (
    <Overlay>
      <section
        className={`${
          backgroundTheme === "light" ? "bg-white" : "bg-zinc-900"
        } parent-reader-container pt-12`}
      >
        {isBookRendered ? (
          <>
            <ReaderHeader
              title={bookToRead ? bookToRead.title : ""}
              cover={bookToRead ? bookToRead.cover : ""}
            />
            <Previous handlePrevClick={handlePrevClick} />
            <Next handleNextClick={handleNextClick} />
            <FooterReader readingProgress={readingProgress} />
          </>
        ) : (
          <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center">
            <span className="spinner" />
          </div>
        )}

        <div
          className={`reader-container ${
            backgroundTheme === "light" ? "bg-white" : "bg-zinc-900 text-white"
          } pb-12 `}
          style={{ overflowX: "hidden" }}
          ref={readerContainerRef}
          onClick={() => setTocDropdown(false)}
        />
      </section>
    </Overlay>
  );
}
