import { useState, useEffect } from "react";

function getSavedValue(storageKey: string, initialValue: any) {
    const savedValue = localStorage.getItem(storageKey);
    if (!savedValue) return initialValue;
    return JSON.parse(savedValue);
}

export function useLocalStorage(storageKey: string, initialValue: any) {
    const [value, setValue] = useState(() => getSavedValue(storageKey, initialValue));

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value]);
    
    return [value, setValue];
}