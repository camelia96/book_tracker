"use server";

import { prisma } from "../lib/prisma";

export async function getBooksProfile() {
  // Fetch all books from database
  
  return await prisma.books.findMany({
    include: {
      books_profiles: {
        select: {status_id: true}
      }
    }
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
        where: {status_id:id},
        select: {status_id: true}
      }
    }
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
        where: {status_id:id},
        select: {status_id: true}
      }
    }
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
        where: {status_id:id},
        select: {status_id: true}
      }
    }
  });
}

export async function getBookProfileProgress(id: number) {
  return await prisma.books_profiles_progress.findMany({
    where: {
      book_profile_id: id
    },
  })
}