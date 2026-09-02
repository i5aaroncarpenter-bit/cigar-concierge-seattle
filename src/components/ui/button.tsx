import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const tapScale = "active:not-disabled:scale-[0.96]";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 border text-center font-semibold tracking-[0.12em] uppercase transition-[scale,background-color,color,border-color,box-shadow] duration-150 ease-[var(--ease-out-quart)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gold: "border-transparent bg-gold text-navy hover:bg-gold-bright hover:shadow-[0_8px_24px_rgb(201_162_39/0.28)]",
        ghost: "border-gold bg-transparent text-cream hover:bg-gold/15",
        navy: "border-transparent bg-navy text-cream hover:bg-navy-mid",
        outline:
          "border-navy bg-transparent text-navy hover:bg-navy hover:text-cream",
        outlineGold:
          "border-gold bg-transparent text-gold-bright hover:bg-gold hover:text-navy",
      },
      size: {
        md: "min-h-11 px-5 py-3 text-xs",
        sm: "min-h-10 px-3 py-2 text-[11px]",
        icon: "size-11 rounded-full p-0",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean; static?: boolean };

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant, size, asChild, type = "button", static: isStatic, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : type}
      className={cn(buttonVariants({ variant, size }), !isStatic && tapScale, className)}
      {...props}
    />
  );
});

export { buttonVariants };
