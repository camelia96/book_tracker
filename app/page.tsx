"use client"
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { AddBook } from "@/components/ui/add-book-form-custom";

import { Separator } from "@/components/ui/separator";
import { useContext, useEffect, useState } from "react";
import { getBookProfile, getBooksProfile, getCompletedBooks, getInProgressBooks, getNotStartedBooks } from "../actions/books";
import { CarouselCustom } from "@/components/ui/carousel-custom";
import { BookWithProfiles } from "@/app/types";
import { STATUSES_IDS, fakeCurrentProfile } from "./constants/constants";
import { createBookProfile } from "@/actions/books_profiles";
import { booksModel, profilesModel } from "@/generated/prisma/models";
import { getProfiles } from "@/actions/profiles";

export default function Home() {
  // States  
  //const [allBooks, setAllBooks] = useState<BookWithProfiles[]>([]);

  const [notStartedBooks, setNotStartedBooks] = useState<BookWithProfiles[]>([]);
  const [inProgressBooks, setInProgressBooks] = useState<BookWithProfiles[]>([]);
  const [completedBooks, setCompletedBooks] = useState<BookWithProfiles[]>([]);

  // Current user
  const [user, setUser] = useState<profilesModel | null>(null)

  // Callbacks
  const handleBookCreated = (newBookId: number) => {

    // Update new book on carousel - not started because by default it creates not started
    getBookProfile(newBookId).then((data) => {
      console.log(data);
      if (data) {
        setNotStartedBooks([...notStartedBooks, data])
      }
    })
  }


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
      console.log("new not started books", notStartedBooks)
    } else if (updatedStatusId === STATUSES_IDS.in_progress) {
      setInProgressBooks([...inProgressBooks, updatedBook])

    } else if (updatedStatusId === STATUSES_IDS.completed) {
      setCompletedBooks([...completedBooks, updatedBook])

    }
  }

  const handleDeleteBook = (deletedBook: booksModel) => {
    if (notStartedBooks.find(b => b.id == deletedBook.id)) setNotStartedBooks(notStartedBooks.filter(b => b.id !== deletedBook.id))
    if (inProgressBooks.find(b => b.id == deletedBook.id)) setInProgressBooks(inProgressBooks.filter(b => b.id !== deletedBook.id))
    if (completedBooks.find(b => b.id == deletedBook.id)) setCompletedBooks(completedBooks.filter(b => b.id !== deletedBook.id))
  }


  useEffect(() => {
    // Get books
    getBooksProfile(fakeCurrentProfile).then(
      (data) => {
        const allProfileBooks: BookWithProfiles[] = data;

        // Filter and set books by status
        setNotStartedBooks(allProfileBooks.filter((b) => b.books_profiles[0].status_id == STATUSES_IDS.not_started));
        setInProgressBooks(allProfileBooks.filter((b) => b.books_profiles[0].status_id == STATUSES_IDS.in_progress));
        setCompletedBooks(allProfileBooks.filter((b) => b.books_profiles[0].status_id == STATUSES_IDS.completed));
      }
    );

    /* // Get not started books
    getNotStartedBooks(fakeCurrentProfile).then(setNotStartedBooks)
    // // Get in progress books
    getInProgressBooks(fakeCurrentProfile).then(setInProgressBooks)
    // // Get completed books
    getCompletedBooks(fakeCurrentProfile).then(setCompletedBooks) */

    /** Get books from profile */





  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-32 px-16 gap-6 bg-white dark:bg-black sm:items-start">
        <h1>Book tracker</h1>

        <Separator />

        <div>
          <h2>Profile</h2>
          <Badge variant={"outline"}>username</Badge>
        </div>

        <Separator />

        {/* Add new book */}
        <AddBook user={fakeCurrentProfile} onBookCreated={handleBookCreated} />

        <Separator />

        <h2>Books to read</h2>
        <CarouselCustom books={notStartedBooks} onStatusChange={handleStatusUpdate} onDeleteBook={handleDeleteBook} />

        <Separator />

        <h2>Reading Books</h2>
        <CarouselCustom enhanced={true} books={inProgressBooks} onStatusChange={handleStatusUpdate} onDeleteBook={handleDeleteBook} />

        <Separator />

        <h2>Read books</h2>
        <CarouselCustom books={completedBooks} onStatusChange={handleStatusUpdate} onDeleteBook={handleDeleteBook} />


      </main>
    </div>
  );
}
