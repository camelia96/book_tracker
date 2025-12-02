import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { BookCard } from "./book-card-custom";
import { ListBookProps } from "@/app/types";


export function CarouselCustom({ books, enhanced = false, onStatusChange, onDeleteBook }: ListBookProps) {

    {/* Carousel start */ }
    return (<Carousel className="w-full justify-center">
        <CarouselContent>
            {books.length == 0
                ? (<CarouselItem>
                    <p className="text-gray-500">No books in this section</p>
                </CarouselItem>)
                : (<>
                    {books.map((e) =>
                    (<CarouselItem key={e.id} className="sm:basis-1/2 md:basis-1/3">
                        <BookCard book={e} enhanced={enhanced} onStatusChange={onStatusChange} onDeleteBook={onDeleteBook}/>
                    </CarouselItem>))}
                </>)
            }

        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
    </Carousel>)
}