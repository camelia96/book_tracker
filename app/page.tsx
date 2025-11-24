import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AddBook } from "@/components/ui/add-book-form-custom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BookCard } from "@/components/ui/book-card-custom";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-32 px-16 gap-6 bg-white dark:bg-black sm:items-start">
        <h1>Book tracker</h1>

        <Separator />

        <div>
          <h2>Profile</h2>
          <Badge variant={"outline"}>username</Badge>
        </div>

        <Separator />

        {/* Add new book */}
        <AddBook/>

        <Separator />

        <h2>Books to read</h2>
        {/* Carousel start */}
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="basis-1/3">
              {/* Card start */}
              <BookCard title={"Book name"}/>
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              {/* Card start */}
              <BookCard title={"Book name"}/>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Separator />
        
        <h2>Reading Books</h2>
        {/* Carousel start */}
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="basis-1/3">
              {/* Card start */}
              <BookCard title={"Book name"} enhanced={true}/>
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              {/* Card start */}
              <BookCard title={"Book name"} enhanced={true}/>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Separator />
        
        <h2>Read books</h2>
        {/* Carousel start */}
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="basis-1/3">
              {/* Card start */}
              <BookCard title={"Book name"}/>
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <BookCard title={"Book name"}/>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>

      </main>
    </div>
  );
}
