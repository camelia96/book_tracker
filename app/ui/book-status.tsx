"use client";
import { useState } from "react";
import { AlertCustom } from "./alert-custom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { statuses } from "@/generated/prisma/client";
import { toast } from "sonner";
import { updateBookStatus } from "@/actions/books_profiles";

interface BookStatusProps {
    bookProfile: { bookProfileId: number; bookStatusId: number; },
    statuses: statuses[]
}

export function BookStatus({ bookProfile, statuses }: BookStatusProps) {

    const [status, setStatus] = useState<String>(bookProfile.bookStatusId.toString());

    // Update book status handler
    const handleStatusChange = async (e: string) => {
        // Change select status
        setStatus(e);

        // Update select on db
        const result = await updateBookStatus(bookProfile.bookProfileId, parseInt(e));

        result && result.updatedBookStatus ? toast.success("Status updated successfully") : toast.error("There was a problem trying to update the book status")

    }
    return (
        <>
            {/** Book status */}
            {statuses.length === 0

                ? (<AlertCustom
                    color="error"
                    title="Error"
                    type="destructive"
                    description="No statuses available for the book. Refresh and try again" />)

                : (<Select value={status.toString()} onValueChange={handleStatusChange} >
                    <h6 className="py-1">Status</h6>
                    <SelectTrigger

                        className={`
                    w-full
                    text-xs 
                    ${status == '3' ? 'border-border-success bg-bg-success text-text-success '

                                : status == '2' ? 'border-border-warning bg-bg-warning text-text-warning '

                                    : 'border-border-info bg-bg-info text-text-info '}`}>

                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent >
                        {statuses.map((e) => (<SelectItem key={e.id} value={e.id.toString()} className="text-xs" >{e.status}</SelectItem>))}
                    </SelectContent>
                </Select>)
            }
        </>
    )
}