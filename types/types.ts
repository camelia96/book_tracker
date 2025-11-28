import { books_profilesModel, booksModel } from "@/generated/prisma/models";

export type BookWithProfiles = booksModel & {
  books_profiles: { id: number; status_id: number }[];
};

// Functions
export type CallbackFunction = (result: number) => void;
