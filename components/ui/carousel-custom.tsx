import { booksModel } from "@/generated/prisma/models";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { BookCard } from "./book-card-custom";
import { BookWithProfiles } from "@/types/types";

interface CarouselCustomProps {
    books: BookWithProfiles[];
    enhanced?: boolean
}

export function CarouselCustom( {books, enhanced = false} : CarouselCustomProps) {

    {/* Carousel start */ }
    return (<Carousel className="w-full">
        <CarouselContent>
            {books.map((e) =>
            (<CarouselItem key={e.id} className="basis-1/3">
                <BookCard book={e} enhanced={enhanced} />
            </CarouselItem>))}

        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
    </Carousel>)
}