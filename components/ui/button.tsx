import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base !font-extrabold !text-white transition-[transform,filter,box-shadow,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 disabled:hover:brightness-100 disabled:hover:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-[5px] border-gray-300 bg-gradient-to-r from-[#b400e8] to-[#7300e8] shadow-lg hover:scale-110 hover:brightness-110 hover:shadow-2xl",
        destructive:
          "border-[5px] border-gray-300 bg-gradient-to-r from-[#b400e8] to-[#7300e8] shadow-lg hover:scale-110 hover:brightness-110 hover:shadow-2xl",
        outline:
          "border-[5px] border-gray-300 bg-gradient-to-r from-[#b400e8] to-[#7300e8] shadow-lg hover:scale-110 hover:brightness-110 hover:shadow-2xl",
        secondary:
          "border-[5px] border-gray-300 bg-gradient-to-r from-[#b400e8] to-[#7300e8] shadow-lg hover:scale-110 hover:brightness-110 hover:shadow-2xl",
        ghost:
          "border-[5px] border-gray-300 bg-gradient-to-r from-[#b400e8] to-[#7300e8] shadow-lg hover:scale-110 hover:brightness-110 hover:shadow-2xl",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-16 px-10 text-lg",
        sm: "h-14 px-8 text-base",
        lg: "h-20 px-14 text-xl",
        icon: "h-16 w-16 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
