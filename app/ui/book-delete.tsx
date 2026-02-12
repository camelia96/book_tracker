"use client"
import { cn } from "@/lib/utils";
import { AlertDialogCustom } from "./alert-dialog-custom";
import { buttonVariants } from "@/components/ui/button";
import { deleteBookComplete } from "@/actions/books";
import { toast } from "sonner";

interface BookDeleteProps {
    book: {
        bookId: number;
        bookProfileId: number;
    }
}
export function BookDelete({ book }: BookDeleteProps) {

    // Delete book handler
    const handleDeleteBook = async () => {

        // Delete book
        const result = await deleteBookComplete(book.bookId, book.bookProfileId);

        result.success && result.book ? toast.success("Deleted book successfully") : toast.error("There was an error when trying to delete the book");

    }

    return (
        <>
            <div className="flex flex-col w-full gap-3 mt-4">

                <AlertDialogCustom
                    triggerClassName="w-full"
                    description="This action cannot be undone. This will permanently delete the book from the database."
                    trigger={(<div className={cn(buttonVariants({ variant: "default" })) + ` text-xs w-full`}>Delete book</div>)}
                    action="Delete"
                    handle={handleDeleteBook} />
            </div>

        </>
    )
}