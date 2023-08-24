import type { HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    buttonType?: "text" | "toggle"
}

export default function Button({ children, buttonType, className, ...props }: ButtonProps) {
    return (
        <button
            className={`button ${buttonType ? buttonType : ""} ${className ? className : ""}`}
            { ...props }
        >
            { children }
        </button>
    );
}