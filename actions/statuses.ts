"use server";

import { prisma } from "../lib/prisma";

// Read

export async function getStatuses() {
  // Fetch all books from database
  return await prisma.statuses.findMany();
}
