import type { HTMLAttributes, ReactNode } from 'react';
import { useState, useRef, useId } from 'react';

interface SwitchProps extends HTMLAttributes<HTMLInputElement> {
    checkedIcon?: ReactNode,
    uncheckedIcon?: ReactNode
}

export default function Switch({ checkedIcon, uncheckedIcon, className, ...props }: SwitchProps) {
    const [checkboxChecked, setCheckboxChecked] = useState<boolean>(props.defaultChecked || false);
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useId();

    function handleClick() {
        if (!inputRef.current) return;
        inputRef.current.click();
        setCheckboxChecked(inputRef.current.checked);
    }

    return (
        <>
            <input 
                style={{ display: "none" }}
                type="checkbox" 
                ref={inputRef}
                id={id}
                { ...props }
            />

            <button 
                className={`switch ${className ? className : ""}`}
                data-checked={checkboxChecked} 
                role="switch"
                aria-label='switch'
                aria-checked={checkboxChecked}
                aria-controls={id}
                onClick={handleClick}
            >
                <div className="switch-track" aria-hidden="true" />
                <div className="switch-thumb" aria-hidden="true">
                    { checkboxChecked ? <>{checkedIcon}</> : <>{uncheckedIcon}</> }
                </div>
            </button>
        </>
    );
}