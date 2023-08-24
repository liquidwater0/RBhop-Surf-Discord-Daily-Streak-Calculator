import type { HTMLAttributes } from 'react';
import { useState, useRef, useId } from 'react';

interface ToggleButtonProps extends HTMLAttributes<HTMLInputElement> {

}

export default function ToggleButton({ children, className, onClick, ...props }: ToggleButtonProps) {
    const [toggled, setToggled] = useState<boolean>(props.checked || false);
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useId();

    function handleClick() {
        if (!inputRef.current) return;
        inputRef.current.click();
        setToggled(inputRef.current.checked);
    }

    return (
        <>
            <input 
                className='toggle-button-input'
                type="checkbox" 
                ref={inputRef}
                id={id}
                { ...props }
            />

            <button
                className={`button toggle ${className ? className : ""}`}
                data-toggled={toggled}
                aria-controls={id}
                aria-checked={toggled}
                onClick={handleClick}
            >
                { children }
            </button>
        </>
    );
}