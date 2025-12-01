import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { BookCard } from "./book-card-custom";
import { BookWithProfiles, UpdateStatusCallbackFunction } from "@/app/types/types";

interface CarouselCustomProps {
    books: BookWithProfiles[];
    enhanced?: boolean,
    onBookStatusChange: UpdateStatusCallbackFunction
}

export function CarouselCustom({ books, enhanced = false, onBookStatusChange }: CarouselCustomProps) {

    
    {/* Carousel start */ }
    return (<Carousel className="w-full">
        <CarouselContent>
            {books.map((e) =>
            (<CarouselItem key={e.id} className="basis-1/3">
                <BookCard book={e} enhanced={enhanced} onStatusChange={onBookStatusChange} />
            </CarouselItem>))}

        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
    </Carousel>)
}