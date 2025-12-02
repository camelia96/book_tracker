"use server";

import { STATUSES_IDS } from "@/app/constants/constants";
import { prisma } from "../lib/prisma";

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
    return await prisma.books.create({
      data: {
        name: name,
        author: author,
        total_pages: total_pages,
        img_url: img_url,
        year: year,
        category_id: parseInt(category),
      },
    });
  } catch (error: any) {
    return undefined;
  }
}

// Read
export async function getBooksProfile(userId: number) {
  // Fetch all books from database

  return await prisma.books.findMany({
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
}

export async function getBookProfile(bookId: number) {
  return await prisma.books.findFirst({
    where: {
      id: bookId,
    },
    include: {
      books_profiles: {
        select: { id: true, status_id: true },
      },
    },
  });
}

export async function getNotStartedBooks(userId: number) {
  // Fetch all books with status: not started
  return await prisma.books.findMany({
    where: {
      books_profiles: {
        some: {
          // Not started status ID
          status_id: STATUSES_IDS.not_started,
          profile_id: userId,
        },
      },
    },
    include: {
      books_profiles: {
        where: { status_id: STATUSES_IDS.not_started },
        select: { id: true, status_id: true },
      },
    },
  });
}

export async function getInProgressBooks(userId: number) {
  // Fetch all books with status: in progress
  return await prisma.books.findMany({
    where: {
      books_profiles: {
        some: {
          // In progress status ID
          status_id: STATUSES_IDS.in_progress,
          profile_id: userId,
        },
      },
    },
    include: {
      books_profiles: {
        where: { status_id: STATUSES_IDS.in_progress },
        select: { id: true, status_id: true },
      },
    },
  });
}

export async function getCompletedBooks(userId: number) {
  // Fetch all books with status: completed
  return await prisma.books.findMany({
    where: {
      books_profiles: {
        some: {
          // Completed status ID
          status_id: STATUSES_IDS.completed,
          profile_id: userId,
        },
      },
    },
    include: {
      books_profiles: {
        where: { status_id: STATUSES_IDS.completed },
        select: { id: true, status_id: true },
      },
    },
  });
}

// Delete
export async function deleteBook(id: number) {
  try {
    return await prisma.books.delete({
      where: { id: id },
    });
  } catch (error) {
    return undefined;
  }
}
