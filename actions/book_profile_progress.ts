"use server";

import { booksModel } from "@/generated/prisma/models";
import { prisma } from "../lib/prisma";

// Create

export async function createReadingDate(
  bookId: number,
  date: string,
  readPages: number
) {
  try {
    return await prisma.books_profiles_progress.create({
      data: {
        book_profile_id: bookId,
        date: new Date(date),
        read_pages: readPages,
      },
    });
  } catch (error) {
    return undefined;
  }
}

// Read
export async function getBookProfileProgress(bookProfileId: number) {
  return await prisma.books_profiles_progress.findMany({
    where: {
      book_profile_id: bookProfileId,
    },
  });
}

// Delete
export async function deleteReadingDate(readingDateId: number) {
  try {
    return await prisma.books_profiles_progress.delete({
      where: {
        id: readingDateId,
      },
    });
  } catch (error) {
    return undefined;
  }
}

export async function deleteAllReadingDates(bookProfileId: number) {
  try {
    return await prisma.books_profiles_progress.deleteMany({
      where: { book_profile_id: bookProfileId },
    });
  } catch (error) {
    return undefined
  }
}
