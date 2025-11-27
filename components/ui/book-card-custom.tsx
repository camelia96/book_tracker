import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Badge } from "@/components/ui/badge";
import { statusesModel, books_profiles_progressModel } from "@/generated/prisma/models";
import { useEffect, useState } from "react";
import { getStatuses } from "@/actions/statuses";
import { BookWithProfiles } from "@/types/types";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Book, Calendar, ChevronsUpDown, Plus, User } from "lucide-react";
import { getBookProfileProgress } from "@/actions/books";
import { AddReadPagesDate } from "./add-reading-date";

interface CardProps {
  book: BookWithProfiles,
  enhanced?: boolean
}

function formatDate(date: Date) {
  return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
}

export function BookCard({ book, enhanced = false }: CardProps) {
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
  useEffect(() => {
    // Get statuses
    getStatuses().then(setStatuses);

    // Get current book reading dates only if status -> In progress
    getBookProfileProgress(book.id).then((data) => {
      setBooksProgress(data);

      setReadPages(Math.round((data.reduce((acc, book) => acc + book.read_pages, 0) / book.total_pages * 100) * 100) / 100)
    });

  }, [])


  const handleStatusChange = (e: String) => {
    setStatus(e);
  }


  return (
    <Card className="w-full max-w-sm">

      <CardHeader >
        <CardTitle className="flex items-start gap-1"><Book size={16} />{book.name}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-1"><User size={12} />{book.author}</div>
          <div className="flex items-center gap-1"><Calendar size={12} />{book.year}</div>
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

                  <AddReadPagesDate/>
                </div>
                <div className="w-full">
                  <CollapsibleContent className="flex flex-col gap-2">
                    {booksProgress.map((e) => (<Badge key={e.id} variant={"outline"} className="w-full py-2 rounded-md font-normal" >{formatDate(e.date)} - {e.read_pages} pages</Badge>))}
                  </CollapsibleContent>
                </div>
              </Collapsible>

            </div>
          )}


        </CardAction>

        <Separator />

        {book.img_url && <div className="flex items-center justify-center"><img src={book.img_url.toString()} alt="Thumbnail" className=" w-40" /></div>}

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
            <Button className="w-fit text-xs">Delete book</Button>
          </div>
        </CardAction>
      </CardFooter>
    </Card>
  )
}