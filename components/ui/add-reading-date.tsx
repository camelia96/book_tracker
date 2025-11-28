"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { BookWithProfiles } from "@/types/types";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { booksModel } from "@/generated/prisma/models"
import { createReadingDate } from "@/actions/book_profile_progress";
import { formatDate } from "@/functions/functions";


export function AddReadPagesDate({ bookData, sumReadPages }: { bookData: BookWithProfiles, sumReadPages: number }) {

  // Zod validation
  const formSchema = z.object({
    pages: z
      .coerce
      .number<number>({ message: "You must enter a number" })
      .int({ message: "Enter the correct format" })
      .positive({ message: "Enter the correct format" })
      .max(bookData.total_pages - sumReadPages, { message: "You can't read more pages than you have left" })
    ,
    date: z.string()

  })


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Add reading date
    createReadingDate(bookData.id, data.date, data.pages).then((data) => { console.log(data) })
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0] 
    },
  })




  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="size-6">
          <Plus />
          <span className="sr-only"></span>
        </Button>
      </DialogTrigger>

      {/* Content */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Add new date</DialogTitle>
        <DialogDescription>Here you can add a new date whenever you have read a bunch of pages. Don't forget to enter the total of pages too!</DialogDescription>

        <form onSubmit={form.handleSubmit(onSubmit, (errors) => { console.log(errors) })} className="space-y-8">

          {/* Pages  */}
          <Controller
            control={form.control}
            name="pages"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="pagesInput">Read pages</FieldLabel>
                <Input id="pagesInput" placeholder="How many pages have you read?" {...field} type="text" aria-invalid={fieldState.invalid} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value == "" ? undefined : e.target.value)} />
                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
              </Field>
            )}
          />

          {/* Date  */}
          <Controller name="date" control={form.control} render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="date">Date</FieldLabel>
              <Input id="date" type="date" {...field} aria-invalid={fieldState.invalid} value={field.value} />
              {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
            </Field>
          )} />

          {/* Footer */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>

        </form>

      </DialogContent>
    </Dialog>
  )
}

