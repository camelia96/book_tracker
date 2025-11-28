"use server";

import { booksModel } from "@/generated/prisma/models";
import { prisma } from "../lib/prisma";

// Create

export async function createReadingDate(
  bookId: number,
  date: string,
  readPages: number
) {
  return await prisma.books_profiles_progress.create({
    data: {
      book_profile_id: bookId,
      date: new Date(date),
      read_pages: readPages,
    },
  });
}

// Read

export async function getBookProfileProgress(id: number) {
    return await prisma.books_profiles_progress.findMany({
      where: {
        book_profile_id: id,
      },
    });
  }