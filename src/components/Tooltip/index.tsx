import type { ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode,
    text: string
}

export default function Tooltip({ children, text }: TooltipProps) {
    return (
        <div 
            className="tooltip"
            data-tooltip={text}
        >
            { children }
        </div>
    );
}