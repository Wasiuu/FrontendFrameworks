'use client';

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
    const router = useRouter();
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const email = e.target["email"].value;
        const password = e.target["password"].value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Sprawdzenie, czy adres email jest zweryfikowany
            if (!user.emailVerified) {
                setError("Twój adres email nie został zweryfikowany. Sprawdź swoją skrzynkę pocztową.");
                await auth.signOut(); // Automatyczne wylogowanie
                router.push("/user/verify");
                return;
            }

            // Jeśli email jest zweryfikowany, przekieruj na stronę główną
            router.push("/user/profile");
        } catch (error) {
            console.error("Błąd logowania:", error.code, error.message);
            setError("Logowanie nie powiodło się: " + error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md">
                <form onSubmit={onSubmit} className="px-8 py-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Logowanie</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
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
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Wprowadź email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Hasło:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Wprowadź hasło"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-600 transition"
                    >
                        Zaloguj się
                    </button>
                </form>
            </div>
        </div>
    );
}
