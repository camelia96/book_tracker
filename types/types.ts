import { books_profilesModel, booksModel } from "@/generated/prisma/models";

export type BookWithProfiles = booksModel & { books_profiles: {status_id:number}[]; };

