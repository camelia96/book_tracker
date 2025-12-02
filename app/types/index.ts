import {
  books_profiles_progressModel,
  booksModel,
} from "@/generated/prisma/models";

export type BookWithProfiles = booksModel & {
  books_profiles: { id: number; status_id: number }[];
};

// Callback Functions
export type AddBookCallbackFunction = (newBook: BookWithProfiles) => void;

export type UpdateStatusCallbackFunction = (book: BookWithProfiles) => void;

export type AddReadingDateCallbackFunction = (
  readingDate: books_profiles_progressModel
) => void;

export type DeleteBookCallbackFunction = (book: booksModel) => void;

export interface SingleBookProps {
  book: BookWithProfiles;
  enhanced?: boolean;
  onStatusChange: UpdateStatusCallbackFunction;
  onDeleteBook: DeleteBookCallbackFunction;
}

export interface ListBookProps {
  books: BookWithProfiles[];
  enhanced?: boolean;
  onStatusChange: UpdateStatusCallbackFunction;
  onDeleteBook: DeleteBookCallbackFunction;
}