"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { useContext, useEffect, useState } from "react"
import { categoriesModel } from "@/generated/prisma/models"
import { createBook, getBookProfile, getBooksProfile } from "@/actions/books"
import { getCategories } from "@/actions/categories"
import { createBookProfile } from "@/actions/books_profiles"
import { AddBookCallbackFunction } from "@/app/types/types"


// Zod validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Book name must be at least 2 characters.",
  }),
  author: z.string().min(2, {
    message: "Author name must be at least 2 characters.",
  }),
  /*  year: z.string().min(4, { message: "Enter the correct year format" }).max(4, { message: "Enter the correct year format" }).optional().or(z.literal("")).refine((val) => !isNaN(Number(val)), {
     message: "The value must be numeric",
   }), */
  year: z
    .coerce
    .number<number>({ message: "You must enter a number" })
    .min(1800, { message: "Enter a correct year" })
    .max(new Date()
      .getFullYear(), { message: "Enter a correct year" })
    .int({ message: "Enter a correct format" }),
  total_pages: z
    .coerce
    .number<number>({ message: "You must enter a number" })
    .int({ message: "Enter a correct format" })
    .positive({ message: "Enter a correct format" }),
  img_url: z
    .string()
    .optional(),
  category: z
    .string({ message: "You must select a category" })

})

interface AddBookDialogProps {
  user: number, onBookCreated: AddBookCallbackFunction
}


export function AddBook({ user, onBookCreated }: AddBookDialogProps) {


  const [categories, setCategories] = useState<categoriesModel[]>([]);

  // 1. Define your form.
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      author: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //console.log(values)

    // Add new book
    createBook(values).then((data) => {
      //console.log("Create book ", data)

      // Add created book to current profile
      createBookProfile(user, data.id).then((data) => {
        //console.log("Create book profile", data)
        onBookCreated(data.book_id);

      })
    })

  }


  useEffect(() => {
    // Get categories
    getCategories().then(setCategories);
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add new book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogTitle>Add Book</DialogTitle>
        <DialogDescription>Add a new book. You'll have to choose if this is a new book you want to read, a book that you are already reading or a completed book from your selection. Enjoy!</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (errors) => { console.log(errors) })} className="space-y-8">

            <div className="flex gap-10">
              {/** Book name */}
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Book name</FieldLabel>
                    <Input placeholder="Choose a book name" {...field} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/** Author */}
              <Controller
                control={form.control}
                name="author"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Author</FieldLabel>
                    <Input placeholder="Enter the author" {...field} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex gap-10">
              {/** Year */}
              <Controller
                control={form.control}
                name="year"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="yearInput">Year</FieldLabel>
                    <Input aria-invalid={fieldState.invalid} id="yearInput" type="number" placeholder="Enter a year" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value == "" ? undefined : e.target.value)} />
                    {fieldState.error && (<FieldError>{fieldState.error.message}</FieldError>)}
                  </Field>
                )}
              />


              {/** Total pages */}
              <Controller
                control={form.control}
                name="total_pages"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="totalPages">Total pages</FieldLabel>
                    <Input id="totalPages" aria-invalid={fieldState.invalid} placeholder="Enter the amount of pages the book has" {...field} type="number" value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value == "" ? undefined : e.target.value)} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/** IMG Url */}
            <Controller
              control={form.control}
              name="img_url"
              render={({ field, fieldState }) => (
                <Field>
                  <FormLabel>Image URL</FormLabel>
                  <Input placeholder="Enter an image URL" {...field} type="string" aria-invalid={fieldState.invalid} {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) =>
              (<Field
                orientation="responsive"
                data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="categorySelect">Category</FieldLabel>
                <Select name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}>
                  <SelectTrigger aria-invalid={fieldState.invalid} id="categorySelect" className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a category</SelectLabel>
                      {categories.map((c) =>
                        (<SelectItem key={c.id} value={String(c.id)}>{c.category}</SelectItem>))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>)
              }
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>

      </DialogContent>


    </Dialog>
  )
}

