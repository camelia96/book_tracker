"use server";

import { STATUSES_IDS } from "@/app/constants/constants";
import { prisma } from "../lib/prisma";
import { booksModel } from "@/generated/prisma/models";

// Create
export async function createBook({
  name,
  author,
  year,
  total_pages,
  img_url,
  category,
}: {
  name: string;
  author: string;
  year: number;
  total_pages: number;
  category: string;
  img_url?: string | undefined;
}) {
  try {
    const result = await prisma.books.create({
      data: {
        name: name,
        author: author,
        total_pages: total_pages,
        img_url: img_url,
        year: year,
        category_id: parseInt(category),
      },
    });

    return { success: true, createdBook: result };
  } catch (error: any) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Read
export async function getBooksProfile(userId: number) {
  try {
    // Fetch all books from database
    const result = await prisma.books.findMany({
      where: {
        books_profiles: {
          some: {
            profile_id: userId,
          },
        },
      },
      include: {
        books_profiles: {
          select: { id: true, status_id: true },
        },
      },
    });

    return { success: true, booksProfile: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// UPDATE/DELETE: Transactions
// Sequential operations for deleting the book completely
export async function deleteBookComplete(
  bookId: number,
  bookProfileId: number
): Promise<{
  success: boolean;
  book?: booksModel;
  error?: string;
}> {
  try {
    const [deletedDates, deletedBookProfile, deletedBook] =
      await prisma.$transaction([
        // Step 1: Delete book's reading dates
        prisma.books_profiles_progress.deleteMany({
          where: { book_profile_id: bookProfileId },
        }),
        // Step 2: Delete relation book-profile
        prisma.books_profiles.delete({ where: { id: bookProfileId } }),
        // Step 3: Delete book
        prisma.books.delete({ where: { id: bookId } }),
      ]);

    return { success: true, book: deletedBook };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// CREATE: Nested Writes
export async function createBookComplete(
  book: {
    name: string;
    author: string;
    year: number;
    total_pages: number;
    img_url?: string | undefined;
    category: string;
  },
  profileId: number
) {
  try {
    const result = await prisma.books.create({
      data: {
        name: book.name,
        author: book.author,
        total_pages: book.total_pages,
        img_url: book.img_url,
        year: book.year,
        category_id: parseInt(book.category),
        books_profiles: {
          create: {
            profile_id: profileId,
            status_id: STATUSES_IDS.not_started,
          },
        },
      },
      include: {
        books_profiles: {
          select: {
            id: true,
            status_id: true,
          },
        },
      },
    });

    return { success: true, createdBookComplete: result };
  } catch (error: any) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
