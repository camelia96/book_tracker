"use client";;
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { books_profiles_progressModel } from "@/generated/prisma/models";
import { ChevronsUpDown, X } from "lucide-react";
import { AlertDialogCustom } from "./alert-dialog-custom";
import { formatDate } from "../functions/functions";
import { Badge } from "@/components/ui/badge";
import { AddReadPagesDate } from "./add-reading-date-custom";
import { Progress } from "@/components/ui/progress";
import { deleteReadingDate } from "@/actions/book_profile_progress";
import { toast } from "sonner";

interface BookProgressProps {
    bookProfileId: number,
    bookTotalPages: number,
    bookProgress: books_profiles_progressModel[]
}
export function BookProgress({ bookProfileId, bookTotalPages, bookProgress }: BookProgressProps) {

    // How many pages the user has read
    let readPages = bookProgress.reduce((acc, curr) => acc + curr.read_pages, 0);

    // Calculate percentage for Progress bar
    const pagesProgress = Math.round((readPages / bookTotalPages) * 100 * 100) / 100;

    // Delete reading date handler
    const handleDeleteReadingDate = async (id: number) => {

        const result = await deleteReadingDate(id);

        result && result.deletedReadingDate ? toast.success("Reading date deleted successfully") : toast.error("There was a problem when trying to delete the reading date")

    }
    return (
        <>
            <div className="flex flex-col gap-4 mb-4">
                <h6>Progress</h6>
                <div className="flex items-center justify-between gap-3">
                    <Progress color={"black"} value={pagesProgress} /> {pagesProgress}%
                </div>
                {readPages === 100 ? <p>You've reached 100% progress. Consider changing the current status to Completed!</p> : <></>}

            </div>
            <Collapsible className="flex flex-col items-baseline w-full gap-2">

                {/** Reading dates opening button */}
                <div className="flex items-center w-full gap-4">
                    <div className="flex items-center justify-between w-full gap-4 px-2 py-1 border rounded-md">
                        <h4 className="text-left">
                            Reading dates
                        </h4>

                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-6" >
                                <ChevronsUpDown />
                                <span className="sr-only"></span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>

                    <AddReadPagesDate bookProfileId={bookProfileId} leftPagesToRead={bookTotalPages - readPages} />
                </div>

                {/** Show reading dates */}
                <div className="w-full">
                    <CollapsibleContent className="flex flex-col gap-2">
                        {bookProgress.length == 0 ?
                            (<div className="pt-4 text-center text-gray-500">
                                <p>No reading dates</p>
                                <p>Add one and fill up the progress bar!</p>
                            </div>)
                            : (<div className="flex flex-col gap-2">

                                {bookProgress.sort((a, b) => b.date.getTime() - a.date.getTime()).map((e) =>
                                (<Badge key={e.id} variant={"outline"} className="flex items-center justify-center w-full gap-2 py-2 font-normal rounded-md" >
                                    {e.read_pages} pages - {formatDate(e.date)}

                                    {/* Alert Dialog - Confirm deleting reading date*/}
                                    <AlertDialogCustom
                                        triggerClassName="flex"
                                        trigger={<X size={20} className="p-1 transition-all duration-200 rounded-sm hover:bg-gray-100" />}
                                        description="This action cannot be undone. This will permanently delete the reading date. You can always add it again."
                                        handle={() => handleDeleteReadingDate(e.id)}
                                        action={"Delete"}
                                    />

                                </Badge>))}
                            </div>)}
                    </CollapsibleContent>
                </div>
            </Collapsible>
        </>
    )
}