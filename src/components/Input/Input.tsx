import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onEnter?: () => void
}

export default function Input({ value, className, onEnter, ...props }: InputProps) {
    function handleKeyDown({ key }: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
        if (onEnter && key === "Enter") {
            onEnter();
        }
    }

    return (
        <input 
            className={`input ${className ? className : ""}`}
            onKeyDown={handleKeyDown}
            defaultValue={value}
            { ...props } 
        />
    )
}