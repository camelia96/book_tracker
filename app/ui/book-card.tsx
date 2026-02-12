import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookType } from "@/app/types";
import { Separator } from "@/components/ui/separator";
import { Book, Calendar, Layers, LibraryBig, User } from "lucide-react";
import { BookProgress } from "./book-progress";
import { BookDelete } from "./book-delete";
import { BookStatus } from "./book-status";
import { prisma } from "@/lib/prisma";
import { STATUSES_IDS } from "../constants/constants";

export interface BookCardProps {
  book: BookType;
}

export async function BookCard({ book }: BookCardProps) {
  const statuses = await prisma.statuses.findMany();

  const bookData = book.books;
  const bookProfileId = book.id;
  const bookStatusId = book.status_id;
  const bookId = book.book_id;

  return (
    <Card className="w-full p-6">
      {/** Book data */}
      <CardHeader >
        <CardTitle className="flex items-start gap-1"><Book size={16} />{bookData.name}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-1"><User size={12} />{bookData.author}</div>
          <div className="flex items-center gap-1"><Calendar size={12} />{bookData.year}</div>
          <div className="flex items-center gap-1"><Layers size={12} />{bookData.total_pages} pages</div>
          <div className="flex items-center gap-1"><LibraryBig size={12} />{bookData.categories.category}</div>

        </CardDescription>
      </CardHeader>
      <CardAction className="flex flex-col w-full gap-2 text-xs">

        {/* Enhanced function - Progress + Dates - Enhanced only for books in progress*/}
        {bookStatusId === STATUSES_IDS.in_progress && (
          <BookProgress bookProfileId={bookProfileId} bookTotalPages={book.books.total_pages} bookProgress={book.books_profiles_progress} />

        )}

        {/** Book statusﬂ */}
        <BookStatus bookProfile={{ bookProfileId, bookStatusId }} statuses={statuses} />

        <Separator />

        {/** Book image */}
        {bookData.img_url ?
          (<div className="flex items-center justify-center"><img src={bookData.img_url.toString()} alt="Thumbnail" className="w-40 " /></div>)
          : <div className="flex flex-col items-center w-full gap-4"><img src={"https://placehold.net/book.svg"} alt="Thumbnail - No Image Available" className="w-full min-h-12" /></div>}

        {/** Delete book */}
        <BookDelete book={{ bookId, bookProfileId }} />

      </CardAction>

    </Card>
  )
}