import { HTMLAttributes, DetailedHTMLProps, InputHTMLAttributes } from "react";

type NumberInputProps = {
    value?: string,
    onEnter?: () => void
} & HTMLAttributes<HTMLInputElement>

export default function NumberInput({ value, className, onEnter, ...props }: NumberInputProps) {
    function handleKeyDown({ key }: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
        if (onEnter && key === "Enter") onEnter();
    }

    return (
        <input 
            type="number"
            className={`number-input ${className ? className : ""}`}
            onKeyDown={handleKeyDown}
            defaultValue={value}
            { ...props } 
        />
    )
}