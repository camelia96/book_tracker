import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Badge } from "@/components/ui/badge";
import { statusesModel, books_profiles_progressModel } from "@/generated/prisma/models";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { getStatuses } from "@/actions/statuses";
import { BookWithProfiles, UpdateStatusCallbackFunction } from "@/app/types/types";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Book, Calendar, ChevronsUpDown, Layers, Plus, User, X } from "lucide-react";
import { deleteAllReadingDates, deleteReadingDate, getBookProfileProgress } from "@/actions/book_profile_progress";
import { AddReadPagesDate } from "./add-reading-date";
import { formatDate } from "@/app/functions/functions";
import { deleteBookProfile, updateBookStatus } from "@/actions/books_profiles";
import { deleteBook, getBookProfile } from "@/actions/books";
import { STATUSES_IDS } from "@/app/constants/constants";

interface CardProps {
  book: BookWithProfiles,
  enhanced?: boolean,
  onStatusChange: UpdateStatusCallbackFunction
}

function calculateBookProgress(data: books_profiles_progressModel[], book: BookWithProfiles) {
  // Calculate total read pages so far
  const currentReadPages = data.reduce((acc, book) => acc + book.read_pages, 0);

  return { sum: currentReadPages, progress: Math.round(currentReadPages / book.total_pages * 100 * 100) / 100 }
}

export function BookCard({ book, enhanced = false, onStatusChange }: CardProps) {

  // Read pages
  const [readPages, setReadPages] = useState<number>(0)

  // Book current status
  let bookCurrentStatus = book.books_profiles[0].status_id

  // Selected status
  const [status, setStatus] = useState<String>(bookCurrentStatus.toString());


  // All statuses from database
  const [statuses, setStatuses] = useState<statusesModel[]>([]);

  // Books progress
  const [booksProgress, setBooksProgress] = useState<books_profiles_progressModel[]>([]);

  // Sum of all read pages
  const [sumReadPages, setSumReadPages] = useState<number>(0);


  useEffect(() => {
    // Get statuses
    getStatuses().then(setStatuses);

    // Get current book reading dates only if status -> In progress
    getBookProfileProgress(book.id).then((data) => {

      setBooksProgress(data);

      // Set total read pages so far (int)
      setSumReadPages(calculateBookProgress(data, book).sum);
      // Set progress total read pages so far (float)
      setReadPages(calculateBookProgress(data, book).progress)
    });

  }, [])


  const handleStatusChange = (e: string) => {
    // Change select status
    setStatus(e);

    // Update select on db
    updateBookStatus(book.books_profiles[0].id, parseInt(e)).then((data) => {
      console.log("Update book status", data)

      // Get and return updated book
      getBookProfile(data.book_id).then((data) => {
        // Update carousel(parent) books(childs)
        if (data) {
          // Get callback data from book card
          onStatusChange(data);




        }
      })

    });




  }

  // Doesn't make sense to delete a book - once it's in, it's either one of the three statuses
  /*   const handleDeleteBook = (e: MouseEvent<HTMLButtonElement>) => {
      const bookProfileId = book.books_profiles[0].id;
      // Delete book
  
      // 1. Delete all reading dates from book
      deleteAllReadingDates(bookProfileId).then((data) => {
  
        // 2. Delete the book association w/ profile
        deleteBookProfile(bookProfileId).then((data) => {
          deleteBook(book.id)
        })
  
        // 3. Delete book
      })
  
    } */

  const handleReadingDateCreated = (readingDate: books_profiles_progressModel) => {
    const addedDates = [...booksProgress, readingDate];
    setBooksProgress(addedDates)

    // Set total read pages so far (int)
    setSumReadPages(calculateBookProgress(addedDates, book).sum);
    // Set progress total read pages so far (float)
    setReadPages(calculateBookProgress(addedDates, book).progress)


  }

  const handleDeleteReadingDate = (id: number) => {
    // Delete reading date
    deleteReadingDate(id).then((data) => {
      console.log(data)

      const filteredDates = booksProgress.filter((b) => b.id !== id);

      // Set new reading dates
      setBooksProgress(filteredDates)



      // Set total read pages so far (int)
      setSumReadPages(calculateBookProgress(filteredDates, book).sum);
      // Set progress total read pages so far (float)
      setReadPages(calculateBookProgress(filteredDates, book).progress)
    })
  }
  return (
    <Card className="w-full max-w-sm">

      <CardHeader >
        <CardTitle className="flex items-start gap-1"><Book size={16} />{book.name}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-1"><User size={12} />{book.author}</div>
          <div className="flex items-center gap-1"><Calendar size={12} />{book.year}</div>
          <div className="flex items-center gap-1"><Layers size={12} />{book.total_pages} pages</div>

        </CardDescription>
      </CardHeader>


      <CardFooter className="flex flex-col gap-4">
        <CardAction className="text-xs w-full">

          {/* Enhanced function - Progress + Dates */}
          {enhanced && (
            <div className="flex flex-col gap-4 mb-4">
              <h6>Progress</h6>
              <div className="flex items-center gap-3 justify-between">
                <Progress color={"black"} value={readPages} /> {readPages}%
              </div>

              <Collapsible className="flex flex-col gap-2 items-baseline w-full">
                <div className="flex w-full  items-center gap-4">
                  <div className="flex items-center justify-between gap-4 px-2 py-1 rounded-md border w-full">
                    <h4 className="text-left">
                      Reading dates
                    </h4>

                    <CollapsibleTrigger asChild className="">
                      <Button variant="ghost" size="icon" className="size-6">
                        <ChevronsUpDown />
                        <span className="sr-only"></span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  <AddReadPagesDate bookData={book} sumReadPages={sumReadPages} onReadingDateCreated={handleReadingDateCreated} />
                </div>
                <div className="w-full">
                  <CollapsibleContent className="flex flex-col gap-2">
                    {booksProgress.length == 0 ?
                      (<div className="text-gray-500 text-center pt-4">
                        <p>No reading dates</p>
                        <p>Add one and fill up the progress bar!</p>
                      </div>)
                      : (<div>
                        {booksProgress.sort((a, b) => b.date.getTime() - a.date.getTime()).map((e) =>
                        (<Badge key={e.id} variant={"outline"} className="w-full py-2 rounded-md font-normal" >
                          {formatDate(e.date)} - {e.read_pages} pages
                          <Button variant="ghost" size="icon" className="size-6" onClick={() => handleDeleteReadingDate(e.id)}>
                            <X />
                          </Button>
                        </Badge>))}
                      </div>)}
                  </CollapsibleContent>
                </div>
              </Collapsible>

            </div>
          )}


        </CardAction>

        <Separator />

        {book.img_url ?
          (<div className="flex items-center justify-center"><img src={book.img_url.toString()} alt="Thumbnail" className=" w-40" /></div>)
          : <p className=" text-gray-500">No image available</p>}

        <Separator />

        <CardAction className="w-full">
          <Select value={status.toString()} onValueChange={handleStatusChange} >
            <h6>Status</h6>
            <SelectTrigger className=" text-xs">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent >
              {statuses.map((e) => (<SelectItem key={e.id} value={e.id.toString()} className="text-xs" >{e.status}</SelectItem>))}
            </SelectContent>
          </Select>

          {/* Delete Book */}
          <div className="flex flex-col gap-3 mt-4">
            {/*             <Button className="w-fit text-xs" onClick={handleDeleteBook}>Delete book</Button>
 */}          </div>
        </CardAction>
      </CardFooter>
    </Card>
  )
}