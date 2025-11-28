"use server";

import { booksModel } from "@/generated/prisma/models";
import { prisma } from "../lib/prisma";
export async function getCategories() {
    return await prisma.categories.findMany();
  }
  