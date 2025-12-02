"use server";

import { success } from "zod";
import { prisma } from "../lib/prisma";

export async function getCategories() {
  try {
    const result = await prisma.categories.findMany();

    return {success: true, categories: result}
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
