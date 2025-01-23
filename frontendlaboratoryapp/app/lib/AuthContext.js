'use client';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase"; // Import autoryzacji z firebase.js

// Tworzenie kontekstu
const AuthContext = createContext();


// Dostarczenie kontekstu
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Przechowywanie użytkownika
    const [loading, setLoading] = useState(true); // Ładowanie stanu

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // Ustawienie użytkownika
            setLoading(false); // Wyłączenie ładowania
        });

        // Cleanup
        return () => unsubscribe();
    }, []);

    const memoedValue = useMemo(() => ({ user, loading }), [user, loading]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
