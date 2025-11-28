"use server";

import { NOT_STARTED_ID } from "@/app/constants/constants";
import { prisma } from "../lib/prisma";

// Create
export async function createBookProfile(userId: number, bookId: number) {
  return await prisma.books_profiles.create({
    data: {
      book_id: bookId,
      profile_id: userId,
      // By default we start with book not read
      status_id: NOT_STARTED_ID,
    },
  });
}

// Read
