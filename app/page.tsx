"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { AddBook } from "@/components/ui/add-book-form-custom";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { getBooksProfile } from "../actions/books";
import { CarouselCustom } from "@/components/ui/carousel-custom";
import { BookWithProfiles } from "@/app/types";
import { STATUSES_IDS, fakeCurrentProfile } from "./constants/constants";
import { booksModel } from "@/generated/prisma/models";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {

  const { data: session, status } = useSession()

  // States  
  const [notStartedBooks, setNotStartedBooks] = useState<BookWithProfiles[]>([]);
  const [inProgressBooks, setInProgressBooks] = useState<BookWithProfiles[]>([]);
  const [completedBooks, setCompletedBooks] = useState<BookWithProfiles[]>([]);

  // Current user
  //const [user, setUser] = useState<profilesModel | null>(null)

  // Callbacks
  const handleBookCreated = (newBook: BookWithProfiles) => {
    // Update new book on carousel - not started because by default it creates not started
    setNotStartedBooks([...notStartedBooks, newBook])

  }

  // Status change handler
  const handleStatusUpdate = (updatedBook: BookWithProfiles) => {
    setNotStartedBooks(notStartedBooks.filter(b => b.id !== updatedBook.id))
    setInProgressBooks(inProgressBooks.filter(b => b.id !== updatedBook.id))
    setCompletedBooks(completedBooks.filter(b => b.id !== updatedBook.id))

    // Save updated book status id
    const updatedStatusId = updatedBook.books_profiles[0].status_id;

    // Add updated book to equivalent state
    if (updatedStatusId === STATUSES_IDS.not_started) {
      //
      setNotStartedBooks([...notStartedBooks, updatedBook])

    } else if (updatedStatusId === STATUSES_IDS.in_progress) {
      setInProgressBooks([...inProgressBooks, updatedBook])

    } else if (updatedStatusId === STATUSES_IDS.completed) {
      setCompletedBooks([...completedBooks, updatedBook])

    }
  }

  // Delete book handler
  const handleDeleteBook = (deletedBook: booksModel) => {
    if (notStartedBooks.find(b => b.id == deletedBook.id)) setNotStartedBooks(notStartedBooks.filter(b => b.id !== deletedBook.id))
    if (inProgressBooks.find(b => b.id == deletedBook.id)) setInProgressBooks(inProgressBooks.filter(b => b.id !== deletedBook.id))
    if (completedBooks.find(b => b.id == deletedBook.id)) setCompletedBooks(completedBooks.filter(b => b.id !== deletedBook.id))
  }

  // Get current profile books
  const fetchBooksProfile = async () => {
    const result = await getBooksProfile(fakeCurrentProfile);

    if (result && result.booksProfile) {
      const allProfileBooks: BookWithProfiles[] = result.booksProfile;

      // Filter and set books by status
      setNotStartedBooks(allProfileBooks.filter((b) => b.books_profiles[0].status_id == STATUSES_IDS.not_started));
      setInProgressBooks(allProfileBooks.filter((b) => b.books_profiles[0].status_id == STATUSES_IDS.in_progress));
      setCompletedBooks(allProfileBooks.filter((b) => b.books_profiles[0].status_id == STATUSES_IDS.completed));

    }
  }
  
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false }); 
    router.push("/"); 
    router.refresh(); 
  };

  useEffect(() => {
    // Get books
    fetchBooksProfile();

  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-center py-32 px-16 gap-6 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col gap-6">
          <h1>Book tracker</h1>
          <p>
            A web application for readers who want to organize their literary journey.Seamlessly track books across three intuitive categories: <span className="font-semibold">Want to Read</span>, <span className="font-semibold">Currently Reading</span>, and <span className="font-semibold">Completed</span>.
          </p>
          <p>
            <span className="font-semibold">BookTracker</span> lets you track reading progress by logging pages read with dates, organize books across shelves that update as you read, and manage your collection by easily removing titles.
          </p>
        </div>
        {session ? <>

          <Button onClick={handleSignOut}>Sign Out</Button>

          <Separator />

          {/* Add new book */}
          <AddBook user={fakeCurrentProfile} onBookCreated={handleBookCreated} />

          <Separator />

          <h2 className="">Want to Read</h2>
          <CarouselCustom books={notStartedBooks} onStatusChange={handleStatusUpdate} onDeleteBook={handleDeleteBook} />

          <Separator />

          <h2 className="">Currently Reading</h2>
          <CarouselCustom enhanced={true} books={inProgressBooks} onStatusChange={handleStatusUpdate} onDeleteBook={handleDeleteBook} />

          <Separator />

          <h2 className="">Completed</h2>
          <CarouselCustom books={completedBooks} onStatusChange={handleStatusUpdate} onDeleteBook={handleDeleteBook} />

        </> : <Button onClick={() => signIn("github")}>Sign In with GitHub</Button>}
      </main>
    </div>
  );
}
