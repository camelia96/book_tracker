"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { AddReadingDateCallbackFunction, BookWithProfiles } from "@/app/types";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { createReadingDate } from "@/actions/book_profile_progress";

interface AddReadingDateDialogProps {
  bookData: BookWithProfiles, sumReadPages: number, onReadingDateCreated: AddReadingDateCallbackFunction
}


export function AddReadPagesDate({ bookData, sumReadPages, onReadingDateCreated }: AddReadingDateDialogProps) {

  let leftPagesToRead = bookData.total_pages - sumReadPages;

  // Zod validation
  const formSchema = z.object({
    pages: z
      .coerce
      .number<number>({ message: "You must enter a number" })
      .max(leftPagesToRead, { message: "You can't read more pages than you have left" })
      .int({ message: "Enter the correct format" })
      .positive({ message: "Enter the correct format" })
    ,
    date: z.string()

  })


  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0]
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Add reading date
    createReadingDate(bookData.books_profiles[0].id, values.date, values.pages).then((data) => {
      console.log(data);
      // Pass data to parent
      onReadingDateCreated(data)
    })

  }





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
              <Field>
                <FieldLabel htmlFor="pagesInput">Read pages</FieldLabel>
                <Input id="pagesInput" placeholder="How many pages have you read?" {...field} type="number" aria-invalid={fieldState.invalid} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value == "" ? undefined : e.target.value)} />
                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                <FieldDescription>You have {leftPagesToRead} pages left</FieldDescription>
              </Field>
            )}
          />

          {/* Date  */}
          <Controller name="date" control={form.control} render={({ field, fieldState }) => (
            <Field >
              <FieldLabel htmlFor="date">Date</FieldLabel>
              <Input id="date" type="date" {...field} aria-invalid={fieldState.invalid} value={field.value} />
              {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
            </Field>
          )} />

          {/* Footer */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => form.reset()}>Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>

        </form>

      </DialogContent>
    </Dialog>
  )
}

