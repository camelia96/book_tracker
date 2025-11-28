"use client"
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { AddBook } from "@/components/ui/add-book-form-custom";

import { Separator } from "@/components/ui/separator";
import { useContext, useEffect, useState } from "react";
import { getBookProfile, getBooksProfile, getCompletedBooks, getInProgressBooks, getNotStartedBooks } from "../actions/books";
import { CarouselCustom } from "@/components/ui/carousel-custom";
import { BookWithProfiles } from "@/types/types";
import { COMPLETED_ID, fakeCurrentProfile, IN_PROGRESS_ID, NOT_STARTED_ID } from "./constants/constants";
import { createBookProfile } from "@/actions/books_profiles";
import { profilesModel } from "@/generated/prisma/models";
import { getProfiles } from "@/actions/profiles";

export default function Home() {
  // States  
  //const [allBooks, setAllBooks] = useState<BookWithProfiles[]>([]);

  const [notStartedBooks, setNotStartedBooks] = useState<BookWithProfiles[]>([]);
  const [inProgressBooks, setInProgressBooks] = useState<BookWithProfiles[]>([]);
  const [completedBooks, setCompletedBooks] = useState<BookWithProfiles[]>([]);

  // Current user
  const [user, setUser] = useState<profilesModel | null>(null)

  // Callback child -> parent
  const handleBookCreated = (bookId: number) => {
    console.log("handling new book..!!", bookId)


    getBookProfile(bookId).then((data) => {
      console.log(data);
      if (data) {
        setNotStartedBooks([...notStartedBooks, data])
      }
    })
  }

  useEffect(() => {
    // Get books
    //getBooksProfile().then(setAllBooks);

    // Get not started books
    getNotStartedBooks(fakeCurrentProfile).then(setNotStartedBooks)
    // // Get in progress books
    getInProgressBooks(fakeCurrentProfile).then(setInProgressBooks)
    // // Get completed books
    getCompletedBooks(fakeCurrentProfile).then(setCompletedBooks)

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
        <CarouselCustom books={notStartedBooks} />

        <Separator />

        <h2>Reading Books</h2>
        <CarouselCustom enhanced={true} books={inProgressBooks} />

        <Separator />

        <h2>Read books</h2>
        <CarouselCustom books={completedBooks} />


      </main>
    </div>
  );
}
