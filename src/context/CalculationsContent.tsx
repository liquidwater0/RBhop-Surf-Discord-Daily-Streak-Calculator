import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type CalculationsContextType = {
    currentStreak: number,
    desiredStreak: number,
    desiredDateStreak: number,
    currentStreakMultiplier: string,
    desiredStreakMulitplier: string,
    desiredDateMultiplier: string,
    startDate: string,
    desiredDate: string,
    desiredStreakDate: string,
    haveYouDoneDaily: boolean,
    currentCalculator: string,
    calculate: () => void,
    setCurrentCalculator: Dispatch<SetStateAction<string>>,
    setHaveYouDoneDaily: Dispatch<SetStateAction<boolean>>,
    setCurrentStreak: Dispatch<SetStateAction<number>>,
    setDesiredStreak: Dispatch<SetStateAction<number>>,
    setDesiredDate: Dispatch<SetStateAction<string>>
}

const CalculationsContext = createContext<CalculationsContextType>(null!);

export function useCalculations() {
    return useContext(CalculationsContext);
}

export default function CalculationsProvider({ children }: { children: ReactNode }) {
    const [currentStreak, setCurrentStreak] = useState<number>(0);
    const [desiredStreak, setDesiredStreak] = useState<number>(0);
    const [desiredDateStreak, setDesiredDateStreak] = useState<number>(0);

    const [currentStreakMultiplier, setCurrentStreakMultiplier] = useState<string>("x1.000");
    const [desiredStreakMulitplier, setDesiredStreakMultiplier] = useState<string>("x1.000");
    const [desiredDateMultiplier, setDesiredDateMultiplier] = useState<string>("x1.000");
    
    const [startDate, setStartDate] = useState<string>("Start Date");
    const [desiredDate, setDesiredDate] = useState<string>("1/1/2000");
    const [desiredStreakDate, setDesiredStreakDate] = useState<string>("Expected Date");

    const [currentCalculator, setCurrentCalculator] = useState<string>("streakToDate");
    const [haveYouDoneDaily, setHaveYouDoneDaily] = useState<boolean>(false);

    function calculate() {
        const MILLISECONDS_IN_A_DAY = 86400000;
        const now = new Date();

        const startedDate = new Date(now.getTime() - MILLISECONDS_IN_A_DAY * currentStreak);
        const startedDateFormatted = formatDate({ 
            month: startedDate.getMonth() + 1,
            day: haveYouDoneDaily ? startedDate.getDate() : startedDate.getDate() - 1,
            year: startedDate.getFullYear(),
        });

        const expectedDate = new Date(startedDate.getTime() + MILLISECONDS_IN_A_DAY * desiredStreak);
        
        if (!haveYouDoneDaily) expectedDate.setDate(expectedDate.getDate() - 1);

        const expectedDateFormatted = formatDate({ 
            month: expectedDate.getMonth() + 1,
            day: expectedDate.getDate(),
            year: expectedDate.getFullYear(),
        });

        const desiredDateObj = new Date(desiredDate);
        const difference = desiredDateObj.getTime() - startedDate.getTime();
        const newDesiredDateStreak = 
            haveYouDoneDaily ?
            Math.ceil((difference / MILLISECONDS_IN_A_DAY)) :
            Math.ceil((difference / MILLISECONDS_IN_A_DAY) + 1);
        
        setStartDate(startedDateFormatted);
        setDesiredStreakDate(expectedDateFormatted);
        setDesiredDateStreak(newDesiredDateStreak);
        setCurrentStreakMultiplier(getMultiplierFromStreak(currentStreak));
        setDesiredStreakMultiplier(getMultiplierFromStreak(desiredStreak));
        setDesiredDateMultiplier(getMultiplierFromStreak(newDesiredDateStreak));
    }

    function getMultiplierFromStreak(streak: number) {
        return `x${(1 + (streak / 150)).toFixed(3)}`;
    }

    function formatDate({ month, day, year }: { month: number, day: number, year: number }) {
        const monthString = month.toString();
        const dayString = day.toString();
        const yearString = year.toString();
    
        return `${monthString}/${dayString}/${yearString}`;
    }

    return (
        <CalculationsContext.Provider value={{ 
            currentStreak,
            desiredStreak,
            desiredDateStreak,
            startDate, 
            desiredStreakDate,
            desiredDate,
            currentStreakMultiplier,
            desiredStreakMulitplier,
            desiredDateMultiplier,
            haveYouDoneDaily, 
            currentCalculator,
            calculate,
            setCurrentCalculator,
            setHaveYouDoneDaily, 
            setCurrentStreak, 
            setDesiredStreak, 
            setDesiredDate 
        }}>
            { children }
        </CalculationsContext.Provider>
    );
}