import type { ReactNode } from 'react';
import { useState, useRef } from 'react';

interface TooltipProps {
    children: ReactNode,
    text: string
}

//overflow still a problem but it's good enough for now
export default function Tooltip({ children, text }: TooltipProps) {
    const [side, setSide] = useState<"left" | "middle" | "right">("middle");
    const tooltipElement = useRef<HTMLDivElement>(null);
    const tooltipTextElement = useRef<HTMLSpanElement>(null);

    function handleMouseEnter() {
        if (!tooltipElement.current || !tooltipTextElement.current) return;
        
        const tooltipTextElementRect = tooltipTextElement.current.getBoundingClientRect();
        const directElement = tooltipElement.current.children[1];
        const directElementRect = directElement.getBoundingClientRect();

        tooltipElement.current.style.setProperty("--bottom", `${directElementRect.height}px`);

        if (tooltipTextElementRect.left < 0) {
            setSide("left");
        } else if (tooltipTextElementRect.right > window.innerWidth) {
            setSide("right");
        } else {
            setSide("middle");
        }
    }

    return (
        <div 
            className={`tooltip ${side}`}
            ref={tooltipElement}
            onMouseEnter={handleMouseEnter}
        >
            <span 
                className='tooltip-text'
                ref={tooltipTextElement}
            >
                { text }
            </span>

            { children }
        </div>
    );
}