import type { HTMLAttributes } from 'react';
import { useEffect, useState, useRef, useId } from 'react';
import { Button } from "../Button";

interface ToggleButtonProps extends HTMLAttributes<HTMLInputElement> {
    group?: string,
    onToggle?: () => void
}

export default function ToggleButton({ children, group, className, onToggle, ...props }: ToggleButtonProps) {
    const [toggled, setToggled] = useState<boolean>(props.defaultChecked || false);
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useId();

    useEffect(updateToggleState, [inputRef.current?.checked]);

    function updateToggleState() {
        if (!inputRef.current) return;
        setToggled(inputRef.current.checked);
    }

    function handleClick() {
        if (!inputRef.current) return;
        if (onToggle) onToggle();
        inputRef.current.click();
    }

    function handleChange() {
        updateToggleState();
    }

    return (
        <>
            <input 
                style={{ display: "none" }}
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
                role={group ? "radio" : "checkbox"}
                aria-controls={id}
                aria-checked={toggled}
                onClick={handleClick}
            >
                { children }
            </Button>
        </>
    );
}