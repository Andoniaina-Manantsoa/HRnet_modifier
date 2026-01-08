import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// fonction ThemeContext pour gérer le thème clair/sombre
const ThemeContext = createContext();

// fonction ThemeProvider pour fournir le contexte du thème
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useLocalStorage("theme", "light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`theme-${theme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

// fonction useTheme pour consommer le contexte du thème
export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}
