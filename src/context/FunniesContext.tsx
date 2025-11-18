import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type FunniesContextType = {
    isAprilFirst: boolean
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

    useEffect(() => {
        document.documentElement.classList.toggle("april-fools", isAprilFirst);
    }, [isAprilFirst]);

    return (
        <FunniesContext.Provider value={{ isAprilFirst }}>
            { children }
        </FunniesContext.Provider>
    );
}