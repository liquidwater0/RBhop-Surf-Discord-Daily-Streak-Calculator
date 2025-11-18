import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type FunniesContextType = {
    isAprilFirst: boolean,
    getRandomThing: () => string
}

const FunniesContext = createContext<FunniesContextType>(null!);

export function useFunnies() {
    return useContext(FunniesContext);
}

export default function FunniesProvider({ children }: { children: ReactNode }) {
    const [isAprilFirst] = useState<boolean>(() => {
        const today = new Date();
        // return true; //for testing purposes
        return today.getMonth() === 3 && today.getDate() === 1;
    });
    const food = ["pies", "coconuts", "bananas", "cheese"];
    const items = ["ring", "headphones", "laptop", "phone"];
    const people = ["robert", "vanessa"];
    const things = [...food, ...items, ...people];

    useEffect(() => {
        document.documentElement.classList.toggle("april-fools", isAprilFirst);
    }, [isAprilFirst]);

    function getRandomThing() {
        return things[Math.floor(Math.random() * things.length)];
    }

    return (
        <FunniesContext.Provider value={{ isAprilFirst, getRandomThing }}>
            { children }
        </FunniesContext.Provider>
    );
}