import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-violet-500 text-white border-violet-500 border-[1px] shadow-[0_2px_0_rgba(109,40,217,1)] active:shadow-none active:translate-y-[2px] md:hover:opacity-85',
        destructive:
          'bg-destructive text-destructive-foreground border-[1px] border-[#ff6959] shadow-[0_2px_0_#ff6959] active:shadow-none active:translate-y-[2px] md:hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-white border-slate-200 border-[1px] shadow-[0_2px_0_rgba(226,232,250,1)] active:shadow-none active:translate-y-[2px] md:hover:bg-slate-100 text-slate-500',
        'call-to-action':
          'text-black bg-gray-100 dark:bg-white border-[1px] shadow-[0_2px_0] border-gray-200 shadow-gray-200 dark:border-gray-400 dark:shadow-gray-400 active:shadow-none active:translate-y-[2px] md:hover:bg-white transition-colors',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs rounded-lg',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
