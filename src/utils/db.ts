import Epub from "epubjs";
import { Book } from "../constants/Book";
import CryptoJS from "crypto-js";
// Connection to database
export function openDatabase(version = 2): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("booksDatabase", 1);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains("books")) {
        db.createObjectStore("books", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Add book to indexedDB
export async function addBookToIndexedDB(book: File): Promise<IDBValidKey> {
  const db = await openDatabase(2);
  const transaction = db.transaction(["books"], "readwrite");
  const objectStore = transaction.objectStore("books");
  const request = objectStore.add({ book });
  return new Promise((resolve, reject) => {
    request.onsuccess = function () {
      resolve(request.result);
    };
    transaction.onerror = function (event: Event) {
      const request = event.target as IDBRequest;
      reject(request.error);
    };
  });
}

export async function deleteBookFromIndexedDB(bookId: number): Promise<void> {
  const db = await openDatabase(2);
  const transaction = db.transaction(["books"], "readwrite");
  const objectStore = transaction.objectStore("books");
  objectStore.delete(bookId);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = function () {
      resolve();    
    };

    transaction.onerror = function (event: Event) {
      const request = event.target as IDBRequest;
      reject(request.error);
    };
  });
}

// Fetching all the stored books in the indexedDB
export async function fetchStoreBooks() {
  const db = await openDatabase(2);
  const transaction = db.transaction(["books"], "readonly");
  const objectStore = transaction.objectStore("books");
  const request = objectStore.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = async () => {
      const books = await Promise.all(
        request.result.map(async (book) => {
          const epub = Epub(book.book);
          const bookIndexedDBId = book.id;
          console.log("bookIndexDBId: ", bookIndexedDBId);
          const coverUrl = await epub.coverUrl();
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
            const publisher = epub.packaging.metadata.publisher;
            const description = epub.packaging.metadata.description;
            const language = epub.packaging.metadata.language;
            const base64File = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(book.book);
            });

            const hash = CryptoJS.SHA256(book.book.name);
            const id = hash.toString(CryptoJS.enc.Hex);
            return {
              id: id,
              bookIndexedDBId: bookIndexedDBId,
              cover: coverBase64,
              title,
              link: book.book,
              hello: "helloworld",
              author,
              publisher,
              description,
              language,
              fileContent: base64File,
              filename: book.book.name,
            } as Book;
          } else {
          }
        })
      );
      resolve(books);
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
}
