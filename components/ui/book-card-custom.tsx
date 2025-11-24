import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Badge } from "@/components/ui/badge";
import { BookTextIcon } from "./book-text";
import { UserIcon } from "./user";
import { CalendarDaysIcon } from "./calendar-days";

interface CardProps {
  title: string
  /*description: string*/
  enhanced?: boolean
  /*onClick?: () => void*/
}

export function BookCard({ title, enhanced = false }: CardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader >
        <CardTitle className="flex items-center gap-1"><BookTextIcon size={16} />{title}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-1"><UserIcon size={12} />Book author</div>
          <div className="flex items-center gap-1"><CalendarDaysIcon size={12} />Book year</div>
        </CardDescription>
      </CardHeader>

      <CardFooter className="">
        <CardAction className="text-xs">
          {enhanced ? (
            <div className="flex flex-col gap-4">
              Progress
              <Progress color={"black"} value={80} className="w-full" />
              <Collapsible className="flex flex-col gap-2 items-baseline ">
                <CollapsibleTrigger className="">
                  <Badge variant={"default"} className="hover:bg-gray-800">Reading dates</Badge>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col gap-2">
                  <Badge variant={"outline"}>01/01/1990</Badge>
                  <Badge variant={"outline"}>01/01/1990</Badge>
                  <Badge variant={"outline"}>01/01/1990</Badge>
                  <Badge variant={"outline"}>01/01/1990</Badge>
                  <Badge variant={"outline"}>01/01/1990</Badge>
                </CollapsibleContent>
              </Collapsible>
              <Button className="text-xs">Add date</Button>
            </div>)
            : <></>}

          <div className="flex flex-col gap-3 mt-4">
            <NativeSelect className="text-xs">
              <NativeSelectOption value="" className="">Status</NativeSelectOption>
              <NativeSelectOption value="in-progress">In progress</NativeSelectOption>
              <NativeSelectOption value="completed">Completed</NativeSelectOption>
              <NativeSelectOption value="not-started">Not started</NativeSelectOption>
            </NativeSelect>
            <Button className="w-fit text-xs">Delete book</Button>
          </div>
        </CardAction>
      </CardFooter>
    </Card>
  )
}