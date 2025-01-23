'use client';

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase/firebase";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
    const router = useRouter();

    const onSubmit = () => {
        signOut(auth)
            .then(() => {
                router.push("/");
            })
            .catch((error) => {
                console.error("Błąd podczas wylogowania:", error);
            });
    };

    return (
        <button
            onClick={onSubmit}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
            Wyloguj się
        </button>
    );
}
