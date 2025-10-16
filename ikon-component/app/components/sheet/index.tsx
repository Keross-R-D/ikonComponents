import { Button } from "../../shadcn/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../shadcn/ui/sheet"

export function SheetComponent({
  buttonText,
  buttonIcon,
  buttonStyle,
  sheetContent,
  sheetDescription,
  sheetTitle,
  closeButton
}: {
  buttonText?: React.ReactNode,
  buttonIcon?: React.ReactNode,
  buttonStyle?: string,
  sheetTitle?: React.ReactNode,
  sheetDescription?: React.ReactNode,
  sheetContent?: React.ReactNode,
  closeButton?: boolean

}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' className={buttonStyle} size={"smIcon"}>{buttonText}{buttonIcon}</Button>
      </SheetTrigger>
      <SheetContent className="p-4" >
        <SheetTitle>{sheetTitle}</SheetTitle>
        {sheetContent}
      </SheetContent>
    </Sheet>
  )
}