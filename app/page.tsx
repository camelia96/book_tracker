import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AddBook } from "@/components/ui/add-book-form";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
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

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-32 px-16 gap-6 bg-white dark:bg-black sm:items-start">
        <h1>Book tracker</h1>
        <div>
          <h2>Profile</h2>
          <Badge variant={"outline"}>username</Badge>
        </div>

        {/* Add new book */}
        <AddBook/>

        
        <h2>Books to read</h2>
        {/* Carousel start */}
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="basis-1/3">
              {/* Card start */}
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>Book name</CardTitle>
                  <CardDescription>Book author, book year</CardDescription>
                </CardHeader>
                <CardContent>
                  <img />IMG
                </CardContent>
                <CardFooter className="">
                  <CardAction className="">
                    <NativeSelect>
                      <NativeSelectOption value="">Status</NativeSelectOption>
                      <NativeSelectOption value="in-progress">In progress</NativeSelectOption>
                      <NativeSelectOption value="completed">Completed</NativeSelectOption>
                      <NativeSelectOption value="not-started">Not started</NativeSelectOption>
                    </NativeSelect>
                    <Button>Delete book</Button>
                  </CardAction>
                </CardFooter>
              </Card>
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              {/* Card start */}
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>Book name</CardTitle>
                  <CardDescription>Book author, book year</CardDescription>
                </CardHeader>
                <CardContent>
                  <img />IMG
                </CardContent>
                <CardFooter className="">
                  <CardAction className="">
                    <NativeSelect>
                      <NativeSelectOption value="">Status</NativeSelectOption>
                      <NativeSelectOption value="in-progress">In progress</NativeSelectOption>
                      <NativeSelectOption value="completed">Completed</NativeSelectOption>
                      <NativeSelectOption value="not-started">Not started</NativeSelectOption>
                    </NativeSelect>
                    <Button>Delete book</Button>
                  </CardAction>
                </CardFooter>
              </Card>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <h2>Reading Books</h2>
        {/* Carousel start */}
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="basis-1/3">
              {/* Card start */}
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>Book name</CardTitle>
                  <CardDescription>Book author, book year</CardDescription>
                </CardHeader>
                <CardContent>
                  <img />IMG
                </CardContent>
                <CardFooter className="">
                  <CardAction className="">
                    Progress<Progress color={"black"} value={80} className="w-full" />
                    <Collapsible>
                      <CollapsibleTrigger>Reading dates for this book (Click icon)</CollapsibleTrigger>
                      <CollapsibleContent>
                        <Badge variant={"outline"}>01/01/1990</Badge>
                        <Badge variant={"outline"}>01/01/1990</Badge>
                        <Badge variant={"outline"}>01/01/1990</Badge>
                        <Badge variant={"outline"}>01/01/1990</Badge>
                        <Badge variant={"outline"}>01/01/1990</Badge>
                      </CollapsibleContent>
                    </Collapsible>
                    <Button>Add date</Button>

                    <NativeSelect>
                      <NativeSelectOption value="">Status</NativeSelectOption>
                      <NativeSelectOption value="in-progress">In progress</NativeSelectOption>
                      <NativeSelectOption value="completed">Completed</NativeSelectOption>
                      <NativeSelectOption value="not-started">Not started</NativeSelectOption>
                    </NativeSelect>
                    <Button>Delete book</Button>
                  </CardAction>
                </CardFooter>
              </Card>
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              {/* Card start */}
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>Book name</CardTitle>
                  <CardDescription>Book author, book year</CardDescription>
                </CardHeader>
                <CardContent>
                  <img />IMG
                </CardContent>
                <CardFooter className="">
                  <CardAction className="">
                    Progress<Progress color={"black"} value={80} className="w-full" />
                    <Collapsible>
                      <CollapsibleTrigger>Reading dates for this book (Click icon)</CollapsibleTrigger>
                      <CollapsibleContent>
                        <Badge variant={"outline"}>01/01/1990</Badge>
                        <Badge variant={"outline"}>01/01/1990</Badge>
                        <Badge variant={"outline"}>01/01/1990</Badge>
                        <Badge variant={"outline"}>01/01/1990</Badge>
                        <Badge variant={"outline"}>01/01/1990</Badge>
                      </CollapsibleContent>
                    </Collapsible>
                    <Button>Add date</Button>

                    <NativeSelect>
                      <NativeSelectOption value="">Status</NativeSelectOption>
                      <NativeSelectOption value="in-progress">In progress</NativeSelectOption>
                      <NativeSelectOption value="completed">Completed</NativeSelectOption>
                      <NativeSelectOption value="not-started">Not started</NativeSelectOption>
                    </NativeSelect>
                    <Button>Delete book</Button>
                  </CardAction>
                </CardFooter>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <h2>Read books</h2>
        {/* Carousel start */}
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="basis-1/3">
              {/* Card start */}
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>Book name</CardTitle>
                  <CardDescription>Book author, book year</CardDescription>
                </CardHeader>
                <CardContent>
                  <img />IMG
                </CardContent>
                <CardFooter className="">
                  <CardAction className="">
                    <NativeSelect>
                      <NativeSelectOption value="">Status</NativeSelectOption>
                      <NativeSelectOption value="in-progress">In progress</NativeSelectOption>
                      <NativeSelectOption value="completed">Completed</NativeSelectOption>
                      <NativeSelectOption value="not-started">Not started</NativeSelectOption>
                    </NativeSelect>
                    <Button>Delete book</Button>
                  </CardAction>
                </CardFooter>
              </Card>
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>Book name</CardTitle>
                  <CardDescription>Book author, book year</CardDescription>
                </CardHeader>
                <CardContent>
                  <img />IMG
                </CardContent>
                <CardFooter className="">
                  <CardAction className="">
                    <NativeSelect>
                      <NativeSelectOption value="">Status</NativeSelectOption>
                      <NativeSelectOption value="in-progress">In progress</NativeSelectOption>
                      <NativeSelectOption value="completed">Completed</NativeSelectOption>
                      <NativeSelectOption value="not-started">Not started</NativeSelectOption>
                    </NativeSelect>
                    <Button>Delete book</Button>
                  </CardAction>
                </CardFooter>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>

      </main>
    </div>
  );
}
