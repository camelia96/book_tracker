"use server";

import { STATUSES_IDS } from "@/app/constants/constants";
import { prisma } from "../lib/prisma";

// Create
export async function createBookProfile(userId: number, bookId: number) {
  try {
    return await prisma.books_profiles.create({
      data: {
        book_id: bookId,
        profile_id: userId,
        // By default we start with book not read
        status_id: STATUSES_IDS.not_started,
      },
    });
  } catch (error) {
    return undefined;
  }
}

// Read

// Update
export async function updateBookStatus(rowId: number, newStatusId: number) {
  try {
    return await prisma.books_profiles.update({
      data: {
        status_id: newStatusId,
      },
      where: { id: rowId },
      select: {
        book_id: true,
      },
    });
  } catch (error) {
    return undefined;
  }
}

// Delete
export async function deleteBookProfile(id: number) {
  try {
    return await prisma.books_profiles.delete({ where: { id: id } });
  } catch (error) {
    return undefined;
  }
}
