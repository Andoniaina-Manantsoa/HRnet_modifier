import { createContext, useContext, useState } from "react";

// création du contexte
const ThemeContext = createContext();

// provider du thème
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light"); // 🔥 uniquement en mémoire

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`theme-${theme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

// hook personnalisé
export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}
