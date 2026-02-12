import { books_profilesGetPayload } from "@/generated/prisma/models";

export type BookType = books_profilesGetPayload<{
  include: {
    books: { include: { categories: true } };
    books_profiles_progress: true;
  };
}>;
