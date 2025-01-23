'use client';

import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
    const router = useRouter();
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const email = e.target["email"].value;
        const password = e.target["password"].value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Wysyłanie emaila weryfikacyjnego
            await sendEmailVerification(user);
            console.log("Email weryfikacyjny został wysłany!");

            // Automatyczne wylogowanie
            await signOut(auth);

            // Przekierowanie do strony weryfikacji
            router.push("/user/verify");
        } catch (error) {
            console.error("Błąd rejestracji:", error.code, error.message);
            setError("Rejestracja nie powiodła się: " + error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 py-6 w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Rejestracja</h2>

                {error && (
                    <div className="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Wprowadź email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Hasło:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Wprowadź hasło"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded w-full font-bold hover:bg-green-600 transition"
                >
                    Zarejestruj się
                </button>
            </form>
        </div>
    );
}
