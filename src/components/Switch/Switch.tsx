import type { HTMLAttributes, ReactNode } from 'react';
import { useState, useRef } from 'react';

interface SwitchProps extends HTMLAttributes<HTMLInputElement> {
    checkedIcon?: ReactNode,
    uncheckedIcon?: ReactNode
}

export default function Switch({ checkedIcon, uncheckedIcon, className, ...props }: SwitchProps) {
    const [checkboxChecked, setCheckboxChecked] = useState<boolean>(props.defaultChecked || false);
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
        if (!inputRef.current) return;
        inputRef.current.click();
        setCheckboxChecked(inputRef.current.checked);
    }

    return (
        <div 
            className={`switch ${className ? className : ""}`}
            data-checked={checkboxChecked} 
            onClick={handleClick}
        >
            <div className="switch-track" />
            <div className="switch-thumb">
                { checkboxChecked ? <>{checkedIcon}</> : <>{uncheckedIcon}</> }
            </div>

            <input 
                type="checkbox" 
                ref={inputRef}
                { ...props }
            />
        </div>
    );
}