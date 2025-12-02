"use server";

import { STATUSES_IDS } from "@/app/constants/constants";
import { prisma } from "../lib/prisma";

// Create
export async function createBookProfile(userId: number, bookId: number) {
  try {
    const result = await prisma.books_profiles.create({
      data: {
        book_id: bookId,
        profile_id: userId,
        // By default we start with book not read
        status_id: STATUSES_IDS.not_started,
      },
    });

    return { success: true, createdBookProfile: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Read

// Update
export async function updateBookStatus(id: number, newStatusId: number) {
  try {
    const result = await prisma.books_profiles.update({
      data: {
        status_id: newStatusId,
      },
      where: { id: id },
      select: {
        id: true,
        status_id: true,
        books: true,
      },
    });
    return { success: true, updatedBookStatus: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Delete
export async function deleteBookProfile(id: number) {
  try {
    const result = await prisma.books_profiles.delete({ where: { id: id } });
    return { success: true, deletedBookProfile: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
