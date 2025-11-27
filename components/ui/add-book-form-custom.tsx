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
  year: z.coerce.number<number>().min(1800, { message: "Enter a correct year" }).max(new Date().getFullYear(), { message: "Enter a correct year" }).int({ message: "Enter a correct format" }).or(z.literal("")),
  total_pages: z.coerce.number<number>({ message: "You must enter a number" }).int({ message: "Enter a correct format" }).positive({ message: "Enter a correct format" }),
  img_url: z.string().optional(),
  category: z.string()

})

export function AddBook() {
  // 1. Define your form.
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      author: "",
      year: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add new book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Add Book</DialogTitle>
        <DialogDescription>Add a new book. You'll have to choose if this is a new book you want to read, a book that you are already reading or a completed book from your selection. Enjoy!</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/** Book name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Book name</FormLabel>
                  <FormControl>
                    <Input placeholder="Choose a book name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/** Author */}
            <FormField
              control={form.control}
              name="author"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the author" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/** Year */}
            <Controller
              control={form.control}
              name="year"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="yearInput">Year</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} id="yearInput" type="number" placeholder="Enter a year" {...field} />
                  {fieldState.error && (<FieldError>{fieldState.error.message}</FieldError>)}
                </Field>
              )}
            />
            {/* <FormField
              control={form.control}
              name=""
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the year" {...field} type="text"   value={field.value} onChange={(e) => field.onChange(e.target.value == "" ? undefined : e.target.valueAsNumber)}   />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/** Total pages */}
            <FormField
              control={form.control}
              name="total_pages"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel htmlFor="totalPages">Total pages</FormLabel>
                  <FormControl>
                    <Input id="totalPages" aria-invalid={fieldState.invalid} placeholder="Enter the amount of pages the book has" {...field} type="number" value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value == "" ? undefined : e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/** IMG Url */}
            <FormField
              control={form.control}
              name="img_url"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter an image URL" {...field} type="string" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field, fieldState }) =>
              (<FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        { }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>)
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

