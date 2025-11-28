"use server";

import { booksModel } from "@/generated/prisma/models";
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
}

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
export async function getBooksProfile() {
  // Fetch all books from database

  return await prisma.books.findMany({
    include: {
      books_profiles: {
        select: { status_id: true },
      },
    },
  });
}

export async function getNotStartedBooks(id: number) {
  // Fetch all books with status: not started
  return await prisma.books.findMany({
    where: {
      books_profiles: {
        some: {
          // Not started status ID
          status_id: id,
        },
      },
    },
    include: {
      books_profiles: {
        where: { status_id: id },
        select: { status_id: true },
      },
    },
  });
}

export async function getInProgressBooks(id: number) {
  // Fetch all books with status: in progress
  return await prisma.books.findMany({
    where: {
      books_profiles: {
        some: {
          // In progress status ID
          status_id: id,
        },
      },
    },
    include: {
      books_profiles: {
        where: { status_id: id },
        select: { status_id: true },
      },
    },
  });
}

export async function getCompletedBooks(id: number) {
  // Fetch all books with status: completed
  return await prisma.books.findMany({
    where: {
      books_profiles: {
        some: {
          status_id: id,
        },
      },
    },
    include: {
      books_profiles: {
        where: { status_id: id },
        select: { status_id: true },
      },
    },
  });
}

export async function getBookProfileProgress(id: number) {
  return await prisma.books_profiles_progress.findMany({
    where: {
      book_profile_id: id,
    },
  });
}

export async function getCategories() {
  return await prisma.categories.findMany();
}
