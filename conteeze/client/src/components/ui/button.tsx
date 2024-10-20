// src/components/ui/button.tsx
import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const buttonStyles = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'border border-gray-500 text-gray-500 hover:bg-gray-100',
      },
      size: {
        sm: 'px-2 py-1',
        md: 'px-4 py-2',
        lg: 'px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyles> {}

const Button: React.FC<ButtonProps> = ({ variant, size, ...props }) => (
  <button className={buttonStyles({ variant, size })} {...props} />
);

export { Button };
