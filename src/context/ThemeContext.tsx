import { ReactNode, createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ThemeContextType = {
    theme: string,
    toggleTheme: (value?: string) => void
}

const ThemeContext = createContext<ThemeContextType>(null!);

export function useTheme() {
    return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useLocalStorage("DSC_theme", "dark");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    function toggleTheme(value?: string) {
        if (!value) {
            setTheme((prev: string) => prev === "dark" ? "light" : "dark");
        } else {
            setTheme(value);
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    );
}