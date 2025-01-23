'use client';

import { useAuth } from "@/app/lib/AuthContext";
import { useEffect } from "react"; // Zamiana na useEffect
import { useRouter } from 'next/navigation'; // Import routera
import PropTypes from 'prop-types'; // Dodanie PropTypes do walidacji propsów

function Protected({ children }) {
    const { user } = useAuth(); // Pobranie stanu użytkownika
    const returnUrl = useRouter().asPath; // Pobranie aktualnej ścieżki
    const router = useRouter(); // Router Next.js

    useEffect(() => {
        if (!user) {
            // Przekierowanie użytkownika, jeśli nie jest zalogowany
            router.push(`/user/signin?returnUrl=${returnUrl}`);
        }
    }, [user, returnUrl, router]); // Dodanie brakujących zależności

    if (!user) {
        return <div>Ładowanie...</div>; // Możesz dodać spinner lub komunikat
    }

    return <>{children}</>;
}

// Walidacja propsów za pomocą PropTypes
Protected.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Protected;
