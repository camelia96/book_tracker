import { books_profiles_progressModel, books_profilesModel, booksModel } from "@/generated/prisma/models";

export type BookWithProfiles = booksModel & {
  books_profiles: { id: number; status_id: number }[];
};

// Callback Functions
export type AddBookCallbackFunction = (newBookId: number) => void;

export type UpdateStatusCallbackFunction = (book: BookWithProfiles) => void;

export type AddReadingDateCallbackFunction = (readingDate: books_profiles_progressModel) => void;