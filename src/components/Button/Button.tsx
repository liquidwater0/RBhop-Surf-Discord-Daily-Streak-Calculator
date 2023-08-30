import type { HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {

}

export default function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button
            className={`button ${className ? className : ""}`}
            { ...props }
        >
            { children }
        </button>
    );
}