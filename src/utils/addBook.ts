import Epub from "epubjs";
import { Book } from "../constants/Book";

export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}
export async function addBook(
  arrayBuffer: ArrayBuffer,
  file: File,
  bookId: number
): Promise<Book> {
  const epub = Epub(arrayBuffer);
  const coverUrl = await epub.coverUrl();
  let book: Book;
  if (coverUrl) {
    const response = await fetch(coverUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    const coverPromise = new Promise<string>((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
    });
    const coverBase64 = await coverPromise;
    const title = epub.packaging.metadata.title;
    const author = epub.packaging.metadata.creator;
    const base64File = await new Promise<string>((resolve, reject) => {
      const readerBase = new FileReader();
      readerBase.onloadend = () => resolve(readerBase.result as string);
      readerBase.onerror = reject;
      readerBase.readAsDataURL(file);
    });
    const id = generateId();
    book = {
      id: id,
      bookIndexedDBId: bookId,
      cover: coverBase64,
      title,
      link: file as unknown as string,
      hello: "helloworld",
      author,
      fileContent: base64File,
      filename: file.name,
    };
  } else {
    throw new Error("No cover found");
  }
  return book;
}
