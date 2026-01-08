import { useState, useEffect } from "react";

// fonction useLocalStorage pour gérer le stockage local
export default function useLocalStorage(key, initialValue) {

    // valeur initiale depuis le localStorage ou la valeur par défaut
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        } catch (error) {
            console.error("LocalStorage error:", error);
            return initialValue;
        }
    });

    // update du localStorage quand la valeur change
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("LocalStorage error:", error);
        }
    }, [key, value]);

    return [value, setValue];
}
