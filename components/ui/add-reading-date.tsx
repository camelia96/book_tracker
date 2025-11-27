"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { ChevronDownIcon, Plus } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { useState } from "react"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"


const formSchema = z.object({
  pages: /* z.string().min(1, { message: "You must enter how many pages you've read on the selected date" }) */
    z.number({ message: "You must enter a number" }).int({ message: "Enter the correct format" }).positive({ message: "Enter the correct format" }),
  date: z.string()

})


export function AddReadPagesDate() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pages: 0,
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

        <form onSubmit={form.handleSubmit(onSubmit, (errors) => { console.log(errors) })}>


          {/* Pages  */}
          <Controller
            control={form.control}
            name="pages"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="pages">Total pages</FieldLabel>
                <Input placeholder="Enter the amount of pages the book has" {...field} type="number" aria-invalid={fieldState.invalid} />
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

