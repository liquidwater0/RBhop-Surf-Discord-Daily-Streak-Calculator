import { ReactNode, HTMLAttributes } from 'react';

export type ButtonProps = {
    children?: ReactNode,
} & HTMLAttributes<HTMLButtonElement>

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