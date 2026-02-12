import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { BookCard } from "./book-card";
import { BookType } from "../types";
import { Input } from "@/components/ui/input";

export interface ListBookProps {
    books: BookType[];
}

export async function CarouselBooks({ books }: ListBookProps) {
    {/* Carousel start */ }
    return (
        <Carousel className="justify-center w-full">

            <CarouselContent>
                {books.length == 0
                    ? (<CarouselItem>
                        <p className="text-gray-500">No books in this section</p>
                    </CarouselItem>)
                    : (<>
                        {books.map((e) =>
                        (<CarouselItem key={e.id} className="sm:basis-1/2 md:basis-1/3">
                            <BookCard book={e}/>
                        </CarouselItem>))}
                    </>)
                }

            </CarouselContent>

            <CarouselNext />
            <CarouselPrevious />
        </Carousel>
    )
}