"use server";
import { prisma } from "../lib/prisma";

// Create
export async function createReadingDate(
  bookId: number,
  date: string,
  readPages: number
) {
  try {
    const result = await prisma.books_profiles_progress.create({
      data: {
        book_profile_id: bookId,
        date: new Date(date),
        read_pages: readPages,
      },
    });

    return { success: true, createdReadingDate: result };
  } catch (error: any) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Read
export async function getBookProfileProgress(bookProfileId: number) {
  try {
    const result = await prisma.books_profiles_progress.findMany({
      where: {
        book_profile_id: bookProfileId,
      },
    });
    return { success: true, bookProfileProgress: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Delete
export async function deleteReadingDate(readingDateId: number) {
  try {
    const result = await prisma.books_profiles_progress.delete({
      where: {
        id: readingDateId,
      },
    });
    return { success: true, deletedReadingDate: result };
  } catch (error: any) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteAllReadingDates(bookProfileId: number) {
  try {
    const result = await prisma.books_profiles_progress.deleteMany({
      where: { book_profile_id: bookProfileId },
    });

    return { success: true, deletedReadingDates: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
