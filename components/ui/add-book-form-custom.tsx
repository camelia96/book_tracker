"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormLabel,
} from "@/components/ui/form"
import {
  Field,
  FieldError,
  FieldLabel,
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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { categoriesModel } from "@/generated/prisma/models"
import { createBookComplete } from "@/actions/books"
import { getCategories } from "@/actions/categories"
import { AddBookCallbackFunction } from "@/app/types"
import { toast } from "sonner"
import { AlertCustom } from "./alert-custom"
import { ScrollArea } from "./scroll-area"

// Zod validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Book name must be at least 2 characters.",
  }),
  author: z.string().min(2, {
    message: "Author name must be at least 2 characters.",
  }),
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

  const [open, setOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<categoriesModel[]>([]);


  // Zod Form defining
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      author: "",
      img_url: ""
    },
  })

  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const result = await createBookComplete(values, user);

    if (result.success && result.createdBookComplete) {

      // Callback to main page
      onBookCreated(result.createdBookComplete);

      // Reset form when submitted
      form.reset()

      // Close dialog
      setOpen(false);

      toast.success("Book created successfully")
    } else {
      toast.error("There was an error when trying to create the book")
    }

  }

  const fetchCategories = async () => {
    try {
      const result = await getCategories();

      if (result && result.categories) {
        setCategories(result.categories)
      } else {

      }
    } catch (error) {

    }

  }


  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button variant="outline">Add new book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogTitle>Add Book</DialogTitle>
        <DialogDescription className="text-xs">Add a new book. You'll have to choose if this is a new book you want to read, a book that you are already reading or a completed book from your selection. Enjoy!</DialogDescription>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit, (errors) => { console.log(errors) })} className=" space-y-2 md:space-y-4">

            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              {/** Book name */}
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field className="gap-2">
                    <FieldLabel className="text-xs " htmlFor="name">Book name</FieldLabel>
                    <Input className="text-xs md:text-xs h-9" id="name" placeholder="Choose a book name" {...field} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                      <FieldError className="text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/** Author */}
              <Controller
                control={form.control}
                name="author"
                render={({ field, fieldState }) => (
                  <Field className="gap-2">
                    <FieldLabel className="text-xs " htmlFor="author">Author</FieldLabel>
                    <Input className="text-xs md:text-xs h-9" id="author" placeholder="Enter the author" {...field} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                      <FieldError className="text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8">

              {/** Year */}
              <Controller
                control={form.control}
                name="year"
                render={({ field, fieldState }) => (
                  <Field className="gap-2 ">
                    <FieldLabel className="text-xs " htmlFor="yearInput">Year</FieldLabel>
                    <Input className="text-xs md:text-xs h-9" aria-invalid={fieldState.invalid} id="yearInput" type="number" placeholder="Enter a year" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value == "" ? undefined : e.target.value)} />
                    {fieldState.error && (<FieldError>{fieldState.error.message}</FieldError>)}
                  </Field>
                )}
              />


              {/** Total pages */}
              <Controller
                control={form.control}
                name="total_pages"
                render={({ field, fieldState }) => (
                  <Field className="gap-2">
                    <FieldLabel className="text-xs " htmlFor="totalPages">Total pages</FieldLabel>
                    <Input className="text-xs md:text-xs h-9" id="totalPages" aria-invalid={fieldState.invalid} placeholder="Enter the amount of pages the book has" {...field} type="number" value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value == "" ? undefined : e.target.value)} />
                    {fieldState.invalid && (
                      <FieldError className="text-xs" errors={[fieldState.error]} />
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
                <Field className="gap-2">
                  <FieldLabel className="text-xs " htmlFor="imgURL">Image URL</FieldLabel>
                  <Input className="text-xs md:text-xs h-9" id="imgURL" placeholder="Enter an image URL" {...field} type="string" aria-invalid={fieldState.invalid} {...field} />
                  {fieldState.invalid && (
                    <FieldError className="text-xs" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) =>
              (<Field
                className="gap-2"
                orientation="responsive"
                data-invalid={fieldState.invalid}>
                <FieldLabel className="text-xs" htmlFor="categorySelect">Category</FieldLabel>
                {categories.length < 1 ?
                  (<AlertCustom
                    type="destructive"
                    title="Error"
                    description="No available categories to create new book! Refresh and try again"
                    color="error" />) : (<>
                      <Select name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger aria-invalid={fieldState.invalid} id="categorySelect" className=" text-xs w-[180px]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent  >
                          <SelectGroup>
                            <SelectLabel>Select a category</SelectLabel>
                            {categories.map((c) =>
                              (<SelectItem className="text-xs" key={c.id} value={String(c.id)}>{c.category}</SelectItem>))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError className="text-xs" errors={[fieldState.error]} />
                      )}
                    </>)}

              </Field>)
              }
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => form.reset()}>Cancel</Button>
              </DialogClose>
              <Button type="submit" >Submit</Button>
            </DialogFooter>
          </form>
        </Form>

      </DialogContent>


    </Dialog>
  )
}

