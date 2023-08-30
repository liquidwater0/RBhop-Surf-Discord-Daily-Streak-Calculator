import type { HTMLAttributes } from 'react';
import { Button } from "../Button";

interface TextButtonProps extends HTMLAttributes<HTMLButtonElement> {

}

export default function TextButton({ children, className, ...props }: TextButtonProps) {
    return (
        <Button
            className="text"
            { ...props }
        >
            { children }
        </Button>
    );
}