import type { HTMLAttributes, DetailedHTMLProps, InputHTMLAttributes } from "react";
import { useEffect, useRef, useState } from "react";
import { Event } from "@mui/icons-material";

interface DateInputProps extends HTMLAttributes<HTMLDivElement> {
    date?: { month: number, day: number, year: number },
    onDateChange?: (value?: string) => void,
    onEnter?: () => void
}

function getDateStringFromObject(dateObject: { month: number, day: number, year: number }) {
    if (!dateObject || !dateObject?.month || !dateObject?.day || !dateObject?.year) return;

    const { month, day, year } = dateObject;
    const mm = month.toString().padStart(2, "0");
    const dd = day.toString().padStart(2, "0");
    const yyyy = year.toString().padStart(4, "0");

    return `${yyyy}-${mm}-${dd}`;
}

function getDateObjectFromString(dateString: string) {
    const date = new Date(dateString);

    return {
        month: date.getMonth() + 1,
        day: date.getDate() + 1,
        year: date.getFullYear()
    }
}

export default function DateInput({ date, className, onDateChange, onEnter, ...props }: DateInputProps) {
    const [dateObject, setDateObject] = useState(date);
    const [isValid, setIsValid] = useState<boolean>(true);

    const dateInput = useRef(null);

    const monthInput = useRef(null);
    const dayInput = useRef(null);
    const yearInput = useRef(null);

    useEffect(() => {
        if (!dateObject) return;

        const dateString = getDateStringFromObject(dateObject!);
        const isValidDate = checkValidDate();
        
        if (onDateChange && isValidDate) {
            onDateChange(dateString);
        }

        setIsValid(isValidDate);
    }, [dateObject]);

    function checkValidDate() {
        const dateString = getDateStringFromObject(dateObject!);

        if (dateObject !== undefined && new Date(dateString!).toString() === "Invalid Date") {
            return false;
        }
        
        return true;
    }

    function handleCalendarClick() {
        if (dateInput.current) {
            (dateInput.current as HTMLInputElement).showPicker();
        }
    }

    function handleKeyDown({ key }: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
        if (onEnter && key === "Enter") onEnter();
    }

    function handleMonthChange() {
        const monthValue = monthInput.current && Number((monthInput.current as HTMLInputElement).value);
        setDateObject((prev: any) => ({ ...prev, month: monthValue }));
    }

    function handleDayChange() {
        const dayValue = dayInput.current && Number((dayInput.current as HTMLInputElement).value);
        setDateObject((prev: any) => ({ ...prev, day: dayValue }));
    }

    function handleYearChange() {
        const yearValue = yearInput.current && Number((yearInput.current as HTMLInputElement).value);
        setDateObject((prev: any) => ({ ...prev, year: yearValue }));
    }

    return (
        <>
            <input 
                style={{ position: "absolute", opacity: 0 }}
                type="date" 
                ref={dateInput} 
                defaultValue={getDateStringFromObject(dateObject!)}
                onChange={({ target }) => {
                    const { month, day, year } = getDateObjectFromString(target.value);
                    setDateObject({ month, day, year });
                }}
            />

            <div 
                className={`date-input ${className ? className : ""} ${!isValid ? "invalid" : ""}`}
                { ...props }
            >
                <div className={`invalid-tooltip ${!isValid ? "show" : ""}`}>Invalid Date!</div>

                <div className="input-wrapper">
                    <input 
                        type="number" 
                        placeholder="mm" 
                        value={dateObject?.month ? dateObject.month : ""}
                        ref={monthInput}
                        onChange={handleMonthChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="input-wrapper">
                    <input 
                        type="number" 
                        placeholder="dd" 
                        value={dateObject?.day ? dateObject.day : ""}
                        ref={dayInput}
                        onChange={handleDayChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="input-wrapper">
                    <input 
                        type="number" 
                        placeholder="yyyy" 
                        value={dateObject?.year ? dateObject.year : ""}
                        ref={yearInput}
                        onChange={handleYearChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                
                <button 
                    className="date-picker-button"
                    onClick={handleCalendarClick}
                >
                    <Event/>
                </button>
            </div>
        </>
    )
}