import type { HTMLAttributes } from 'react';
import { useState, useRef, useId } from 'react';
import { Button } from "../Button";

interface ToggleButtonProps extends HTMLAttributes<HTMLInputElement> {
    group?: string,
    onToggle?: () => void
}

//change event not firing when radio gets unchecked in group
export default function ToggleButton({ children, group, className, onToggle, ...props }: ToggleButtonProps) {
    const [toggled, setToggled] = useState<boolean>(props.defaultChecked || false);
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useId();

    function handleClick() {
        if (!inputRef.current) return;
        if (onToggle) onToggle();
        inputRef.current.click();
    }

    function handleChange(event: any) {
        setToggled(event.target.checked);
    }

    return (
        <>
            <input 
                // style={{ display: "none" }}
                type={group ? "radio" : "checkbox"}
                name={group ? group : ""}
                ref={inputRef}
                id={id}
                onChange={handleChange}
                { ...props }
            />

            <Button
                className={`toggle ${className ? className : ""}`}
                data-toggled={toggled}
                role='checkbox'
                aria-controls={id}
                aria-checked={toggled}
                onClick={handleClick}
            >
                { children }
            </Button>
        </>
    );
}