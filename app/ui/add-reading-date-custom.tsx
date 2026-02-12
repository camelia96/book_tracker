"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { useRef, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import { register } from "module";
import { createReadingDate } from "@/actions/book_profile_progress";
import { toast } from "sonner";

interface AddReadingDateDialogProps {
  bookProfileId: number,
  leftPagesToRead: number
}

export function AddReadPagesDate({ bookProfileId, leftPagesToRead }: AddReadingDateDialogProps) {
  const [isPending, startTransition] = useTransition();

  // Zod validation
  const formSchema = z.object({
    pages: z
      .coerce
      .number<number>({ message: "You must enter a number" })
      .max(leftPagesToRead, { message: "You can't read more pages than you have left" })
      .int({ message: "Enter the correct format" })
      .positive({ message: "You must enter at least 1 page" }),
    date: z.string()

  })

  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

      date: new Date().toISOString().split("T")[0]
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    // Add reading date
    startTransition(async () => {
      const result = await createReadingDate(bookProfileId, values.date, values.pages);

      result && result.createdReadingDate ? toast.success("New reading date successfully created") : toast.error("There was a problem trying to add a new reading date")
    })

  }
  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="size-6">
          <Plus />
          <span className="sr-only"></span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">

        <DialogTitle>Add new date</DialogTitle>
        <DialogDescription className="text-xs">Here you can add a new date whenever you have read a bunch of pages. Don't forget to enter the total of pages too!</DialogDescription>

        <form onSubmit={form.handleSubmit(onSubmit, (errors) => { console.log(errors) })} className="space-y-8">

          {/* Pages  */}
          <Controller
            control={form.control}
            name="pages"
            render={({ field, fieldState }) => (
              <Field >
                <FieldLabel className="text-xs" htmlFor="pagesInput">Read pages</FieldLabel>
                <Input
                  className="text-xs"
                  aria-invalid={fieldState.invalid}
                  id="pagesInput"
                  placeholder="How many pages have you read?"
                  type="text"
                  inputMode="numeric"
                  value={field.value ?? ""}
                  onChange={(e) => { field.onChange(e.target.value == "" ? undefined : e.target.value) }}

                />
                {fieldState.invalid && (<FieldError className="text-xs" errors={[fieldState.error]} />)}
                <FieldDescription className="text-xs">You have {leftPagesToRead} pages left</FieldDescription>
              </Field>
            )}
          />
          {/* Date  */}
          <Controller name="date" control={form.control} render={({ field, fieldState }) => (
            <Field >
              <FieldLabel className="text-xs" htmlFor="date">Date</FieldLabel>
              <Input className="text-xs" id="date" type="date" {...field} aria-invalid={fieldState.invalid} value={field.value} />
              {fieldState.invalid && (<FieldError className="text-xs" errors={[fieldState.error]} />)}
            </Field>
          )} />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => form.reset()}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>Submit{isPending && <Spinner />}</Button>
          </DialogFooter>

        </form >
      </DialogContent>
    </Dialog>
  )
}
