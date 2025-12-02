"use server";
import { prisma } from "../lib/prisma";

// Read
export async function getStatuses() {
  try {
    const result = await prisma.statuses.findMany();
    return { success: true, statuses: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
