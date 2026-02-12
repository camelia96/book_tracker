
import { Separator } from "@/components/ui/separator";
import { CarouselBooks } from "@/app/ui/carousel-books";
import { fakeCurrentProfile, STATUSES_IDS } from "./constants/constants";
import { prisma } from "@/lib/prisma";
import { AddBook } from "./ui/add-book-form";
import { Session } from "./ui/session";
import { BookType } from "./types";

export default async function Home() {

  // Fetch all books
  const library: BookType[] = await prisma.books_profiles.findMany({ include: { books: { include: { categories: true } }, books_profiles_progress: true } });

  const categories = await prisma.categories.findMany();

  return (
    <div className="flex items-center justify-center min-h-screen font-sans bg-zinc-50 dark:bg-black">
      <main className="flex flex-col items-center justify-center w-full max-w-5xl min-h-screen gap-6 px-16 py-32 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col gap-6">
          <h1>Book tracker</h1>
          <p>
            A web application for readers who want to organize their literary journey.Seamlessly track books across three intuitive categories: <span className="font-semibold">Want to Read</span>, <span className="font-semibold">Currently Reading</span>, and <span className="font-semibold">Completed</span>.
          </p>
          <p>
            <span className="font-semibold">BookTracker</span> lets you track reading progress by logging pages read with dates, organize books across shelves that update as you read, and manage your collection by easily removing titles.
          </p>
        </div>

        <Session />
        <Separator />

        {/* Add new book */}
        <AddBook user={fakeCurrentProfile} categories={categories} />

        <Separator />

        <h2>Want to Read</h2>
        <CarouselBooks books={library.filter((a) => a.status_id === STATUSES_IDS.not_started)} />

        <Separator />

        <h2>Currently Reading</h2>
        <CarouselBooks books={library.filter((a) => a.status_id === STATUSES_IDS.in_progress)} />

        <Separator />

        <h2>Completed</h2>
        <CarouselBooks books={library.filter((a) => a.status_id === STATUSES_IDS.completed)} />

      </main>
    </div>
  );
}